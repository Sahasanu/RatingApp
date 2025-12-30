import User from './src/models/User.js';
import bcrypt from 'bcryptjs';
import sequelize from './src/config/db.js';

const createAdmin = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected.');

        const email = 'admin@storerating.com';
        const password = 'AdminPassword@123';
        const name = 'System Administrator';
        const address = 'Admin HQ';

        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            console.log('⚠️  Admin user already exists:', email);
            console.log('Password is the one you set originally.');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await User.create({
                name,
                email,
                password: hashedPassword,
                address,
                role: 'ADMIN' 
            });

            console.log('✅ Admin user created successfully!');
            console.log('Email:', email);
            console.log('Password:', password);
        }

    } catch (error) {
        console.error('❌ Error creating admin:', error);
    } finally {
        await sequelize.close();
    }
};

createAdmin();
