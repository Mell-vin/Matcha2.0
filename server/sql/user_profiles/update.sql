UPDATE user_profiles
SET
    gender_id = $2,
    sexuality_id = $3,
    biography = $4,
    birthdate = $5,
    mylocation = $6,
    latitude = $7,
    longitude =$8
WHERE user_id = $1;