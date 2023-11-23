import UserModel from "../models/user.model.js"

export default async function createUser(input){
    try {
        const user = await UserModel.create(input);
        return user.toJSON();
    }catch(e){
        throw new Error(e);
    }
}

export async function validatePassword({email,password}){
    // 첫번째할일: 사용자존재여부
    const user = await UserModel.findOne({email});
    if (!user) return false; //붏합격

    // 두번째할일: 비밀번호 맞는지체크
    const isValid = await user.comparePassword(password);
    if (!isValid) return false;

    // 둘다 맞으면, 합격
    return (user.toJSON());
}

export async function findUser(query){
    return UserModel.findOne(query).lean();
}
