CREATE PROCEDURE insertCustomer @emailAddress varchar(64), @name varchar(64),
                                @lastName1 varchar(64), @lastName2 varchar(64),
                                @location geometry, @userName varchar(64),
                                @password varchar(64)
WITH ENCRYPTION
AS
BEGIN
    IF @emailAddress IS NOT NULL AND @name IS NOT NULL
        AND @lastName1 IS NOT NULL AND @lastName2 IS NOT NULL
        AND @location IS NOT NULL AND @userName IS NOT NULL
        AND @password IS NOT NULL
    BEGIN
        IF ((SELECT COUNT(*) FROM Customer WHERE name = @name AND lastName1 = @lastName1
            AND lastName2 = @lastName2) = 0
            AND (SELECT COUNT(userName) FROM Customer WHERE userName = @userName) = 0
            AND (SELECT COUNT(location) FROM Customer WHERE (location.STEquals(@location) = 1)) = 0)
        BEGIN
            IF @emailAddress LIKE '%_@__%.__%'
            BEGIN
                IF (SELECT COUNT(emailAddress) FROM Customer WHERE emailAddress = @emailAddress) = 0
                BEGIN
                    /*              Password requirements
                    1. The minimum length is 8 and maximum length is 64.
                    2. The password must have a special character.
                    3. The password must have a capital letter.
                    4. The password must have a number.
                    */
                    IF @password COLLATE Latin1_General_BIN LIKE '%[A-Z]%'
                        AND @password LIKE '%[~!@#$%^&*()_+-={}\[\]:"|\;,./<>?'']%' ESCAPE '\'
                        AND @password LIKE '%[0-9]%'
                        AND LEN(@password) BETWEEN 8 AND 64
                    BEGIN
                        IF (SELECT COUNT(password) FROM Customer WHERE password = HASHBYTES('MD4', @password)) = 0
                        BEGIN
                            BEGIN TRANSACTION
                                BEGIN TRY
                                    INSERT INTO Customer(idSubscription, emailAddress,
                                                         name, lastName1, lastName2, location,
                                                         userName, password)
                                    VALUES (1 , @emailAddress,
                                            @name, @lastName1, @lastName2, @location,
                                            @userName, HASHBYTES('MD4', @password))
                                    PRINT('Customer inserted.')
                                    COMMIT TRANSACTION
                                END TRY
                                BEGIN CATCH
                                    ROLLBACK TRANSACTION
                                    RAISERROR('An error has occurred in the database.', 11, 1)
                                END CATCH
                        END
                        ELSE
                        BEGIN
                            RAISERROR('The password can not be repeated. ', 11, 1)
                        END
                    END
                    ELSE
                    BEGIN
                        SELECT '03' AS message --This is the code error when the password format is invalid.
                        RAISERROR('The password must have a special character, a capital letter, a number, and the minimum length is 8 and maximum length is 64.', 11, 1)
                    END
                END
                ELSE
                BEGIN
                    RAISERROR('The email address can not be repeated.', 11, 1)
                END
            END
            ELSE
            BEGIN
                SELECT '02' AS message --This is the code error when the email format is invalid.
                RAISERROR('The email address is not valid.', 11, 1)
            END
        END
        ELSE
        BEGIN
            RAISERROR('The customer name, the userName and the location cannot be repeated, and the ids must exist.', 11, 1)
        END
    END
    ELSE
    BEGIN
        RAISERROR('Null data is not allowed.', 11, 1)
    END
END
GO