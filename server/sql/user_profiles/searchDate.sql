SELECT
    user_profiles.gender_id,
    users.id,
    user_profiles.user_id,
    user_profiles.sexuality_id,
    genders.gender,
    sexualities.sexuality,
    users.username,
    interests.interest,
    users.first_name,
    users.last_name,
    date_part('year', birthdate),
    user_interests.interest_id,
    user_profiles.mylocation,
    user_profiles.birthdate
FROM (((((user_profiles INNER JOIN genders
    ON user_profiles.gender_id = genders.id)
        INNER JOIN sexualities
            ON user_profiles.sexuality_id = sexualities.id )
            INNER JOIN users
                    ON users.id = user_profiles.user_id)
                        INNER JOIN user_interests
                            ON user_interests.user_id = user_profiles.user_id)
                                INNER JOIN interests
                                    ON interests.id = user_interests.interest_id)
WHERE 
    user_profiles.mylocation ~* $1
AND  
    user_interests.interest_id = $2
AND
	'2020' - date_part('year', birthdate) >= $3
ORDER BY
	date_part DESC;