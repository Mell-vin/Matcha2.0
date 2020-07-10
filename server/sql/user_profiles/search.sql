DECLARE @Columns AS VARCHAR(100)
SELECT @Columns = $4

SELECT
    user_profiles.gender_id,
    user_profiles.sexuality_id,
    genders.gender,
    sexualities.sexuality,
    date_part('year', birthdate),
    user_profiles.biography,
    user_profiles.mylocation,
    user_profiles.latitude,
    user_profiles.longitude,
    user_profiles.birthdate
FROM ((user_profiles INNER JOIN genders
    ON user_profiles.gender_id = genders.id)
        INNER JOIN sexualities
            ON user_profiles.sexuality_id = sexualities.id )
WHERE 
    user_profiles.mylocation ~* $1
OR  
    user_profiles.biography ~* $2
OR
	'2020' - date_part('year', birthdate) >= $3
ORDER BY
	ASC @Columns;