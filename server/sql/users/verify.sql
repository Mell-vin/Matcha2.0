UPDATE users
SET verified = true
WHERE email = $1;