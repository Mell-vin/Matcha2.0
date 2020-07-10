const faker = require('faker');
const pgp = require('pg-promise')();
// const QueryFile = require('pg-promise').QueryFile;
// const path = require('path');
const db = pgp('postgres://postgres:postgres@127.0.0.1:5432/matcha_db');

faker.seed(5000);

class seedmatcha
{
    static async seedusers()
    {
        let randos = [];

        for(let i = 0; i < 3000; i++) { 
            let userid = faker.random.number({min:7, max:1000000});
            let fname = faker.name.firstName(); 
            let lname = faker.name.lastName(); 
            let userseed1 = {
                id: userid,
                username: faker.internet.userName(fname, lname),
                first_name:fname,
                last_name: lname,
                email: faker.internet.email(fname, lname),
                password: faker.internet.password(8),
            }
            let userseed2 = {
                user_id: userid,
                gender_id: faker.random.number({min:1, max:2}),
                sexuality_id: faker.random.number({min:1, max:3}),
                biography: faker.lorem.paragraph(3),
                birthdate: faker.date.between('1980-01-01', '2002-06-01'),
            }
            let userseed3 = {
                interest1: faker.random.number(({min:1, max:6})),
                interest2: faker.random.number(({min:104, max:132})),
                interest3: faker.random.number(({min:143, max:163})),
                interest4: faker.random.number(({min:164, max:184})),
                interest5: faker.random.number(({min:185, max:208}))
            }

            randos.push(userseed1);
            randos.push(userseed2);
            randos.push(userseed3);

            const statement1 = 'INSERT INTO users (id, first_name, last_name, username, email, hashed_password, verified) VALUES ($1, $2, $3, $4, $5, $6, true)';
            const values1 = [
                userseed1.id,
                userseed1.username,
                userseed1.first_name,
                userseed1.last_name,
                userseed1.email,
                userseed1.password
            ];
            const statement2 = 'INSERT INTO user_profiles (user_id, gender_id, sexuality_id, biography, birthdate) VALUES ($1, $2, $3, $4, $5)';
            const values2 = [
                userseed2.user_id,
                userseed2.gender_id,
                userseed2.sexuality_id,
                userseed2.biography,
                userseed2.birthdate
            ];
            const statement3 = 'INSERT INTO user_interests (user_id, interest_id) VALUES ($1, $2)';
            const values3 = [
                userid,
                faker.random.objectElement(userseed3)
            ];
            try {
                const res = await db.query(statement1, values1);
                // console.log(userseed1.id);
                // console.log('user '+userseed.username+' '+userseed.first_name+' '+userseed.last_name+' added'); 
            } catch (err) {
                // console.log(err.message);
            }
            try {
                const res2 = await db.query(statement2, values2);
                // console.log(userseed2.user_id);
                // console.log('user '+userseed.username+' '+userseed.first_name+' '+userseed.last_name+' added'); 
            } catch (err) {
                // console.log(err.message);
            }
            try {
                const res3 = await db.query(statement3, values3);;
                // console.log('user '+userseed.username+' '+userseed.first_name+' '+userseed.last_name+' added'); 
            } catch (err) {
                // console.log(err.message);
            }
        }
    }


    // static async seeduserProfiles()
    // {
    //     let randos = [];

    //     for(let i = 0; i < 10; i++) {
    //         let userseed2 = {
    //             user_id: faker.random.number(1000),
    //             gender_id: faker.random.number(2),
    //             sexuality_id: faker.random.number(3),
    //             biography: faker.lorem.paragraph(3),
    //             birthdate: faker.date.between('1980-01-01', '2002-06-01'),
    //         }
    //         randos.push(userseed2);
    //         const statement2 = 'INSERT INTO user_profiles (user_id, gender_id, sexuality_id, biography, birthdate) VALUES ($1, $2, $3, $4, $5)';
    //         const values2 = [
    //             userseed2.user_id,
    //             userseed2.gender_id,
    //             userseed2.sexuality_id,
    //             userseed2.biography,
    //             userseed2.birthdate
    //         ];
    //         try {
    //             const res2 = await db.query(statement2, values2);
    //             // console.log(userseed.username);
    //             // console.log('user '+userseed.username+' '+userseed.first_name+' '+userseed.last_name+' added'); 
    //         } catch (err) {
    //             console.log(err.message);
    //         }
    //     }
    // }

    static async seedInterests()
    {
        let randos = [];

        for(let i = 4; i < 105; i++) {
            let userseed = {
                i1: faker.address.country(),
                i2: faker.commerce.product(),
                i3: faker.company.catchPhraseNoun(),
                i4: faker.commerce.color(),
                i5: faker.hacker.noun(),
            }
            randos.push(userseed);
            const statement = 'INSERT INTO interests (id, interest) VALUES ($1, $2)';
            const values = [
                i+100,
                faker.random.objectElement(userseed)
            ];
            try {
                const res = await db.query(statement, values);
                // console.log(userseed.username);
                // console.log('user '+userseed.username+' '+userseed.first_name+' '+userseed.last_name+' added'); 
            } catch (err) {
                // console.log(err.message);
            }
        }
    }

    // static async seedUserInterests()
    // {
    //     let randos = [];

    //     for(let i = 0; i < 10; i++) { 
    //         let userseed3 = {
    //             user_id: faker.random.number(1000),
    //             interest1: faker.random.number(({min:1, max:104})),
    //         }
    //         randos.push(userseed);
    //         const statement3 = 'INSERT INTO user_interests (user_id, interest_id) VALUES ($1, $2)';
    //         const values3 = [
    //             userseed3.user_id,
    //             userseed3.interest1
    //         ];
    //         try {
    //             const res3 = await db.query(statement3, values3);
    //             // console.log(userseed.username);
    //             // console.log('user '+userseed.username+' '+userseed.first_name+' '+userseed.last_name+' added'); 
    //         } catch (err) {
    //             console.log(err.message);
    //         }
    //     }
    // }
}


module.exports = { seedmatcha };
