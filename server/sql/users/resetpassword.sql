UPDATE users
SET hashed_password = $2
WHERE email = $1;