UPDATE user_profiles
SET
    iploc = $2
WHERE user_id = $1;