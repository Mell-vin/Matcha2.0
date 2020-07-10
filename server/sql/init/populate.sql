-- Create dummy users
INSERT INTO users (username, first_name, last_name, email, hashed_password, verfified)
VALUES
    ('hetmal', 'Hetero', 'Male', 'hetmal@email.com', '19513fdc9da4fb72a4a05eb66917548d3c90ff94d5419e1f2363eea89dfee1dd', true),
    ('hetfem', 'Hetero', 'Female', 'hetfem@email.com', '19513fdc9da4fb72a4a05eb66917548d3c90ff94d5419e1f2363eea89dfee1dd', true),
    ('hommal', 'Homo', 'Male', 'hommal@email.com', '19513fdc9da4fb72a4a05eb66917548d3c90ff94d5419e1f2363eea89dfee1dd', true),
    ('homfem', 'Homo', 'Female', 'homfem@email.com', '19513fdc9da4fb72a4a05eb66917548d3c90ff94d5419e1f2363eea89dfee1dd', true),
    ('bimal', 'Bi', 'Male', 'bimal@email.com', '19513fdc9da4fb72a4a05eb66917548d3c90ff94d5419e1f2363eea89dfee1dd', true),
    ('bifem', 'Bi', 'Female', 'bifem@email.com', '19513fdc9da4fb72a4a05eb66917548d3c90ff94d5419e1f2363eea89dfee1dd', true);

-- Create preference data
INSERT INTO genders (id, gender)
VALUES
    (1, 'Male'),
    (2, 'Female');

INSERT INTO sexualities (id, sexuality)
VALUES
    (1, 'Heterosexual'),
    (2, 'Homosexual'),
    (3, 'Bisexual');

-- Give users preferences
INSERT INTO user_profiles (user_id, gender_id, sexuality_id, biography, birthdate)
VALUES
    (1, 1, 1, 'I am a heterosexual male', '1995-11-25'),
    (2, 2, 1, 'I am a heterosexual female', '1995-11-25'),
    (3, 1, 2, 'I am a homosexual male', '1995-11-25'),
    (4, 2, 2, 'I am a homosexual female', '1995-11-25'),
    (5, 1, 3, 'I am a bisexual male', '1995-11-25'),
    (6, 2, 3, 'I am a bisexual female', '1995-11-25');

-- Create interests
INSERT INTO interests (interest)
VALUES
    ('My Little Pony'),
    ('Sonic Fanfictions'),
    ('Jake Paul'),
    ('Post-modernism');

-- Give users interests
INSERT INTO user_interests (user_id, interest_id)
VALUES
    (1, 3),
    (2, 1),
    (3, 1),
    (4, 3),
    (5, 2),
    (6, 4);