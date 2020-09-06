import Profile, { IProfile } from "../models/Profiles";

const find = async () => {
  try {
    const profiles = await Profile.find({}).exec();
    return profiles;
  } catch (err) {
    return 'Error occured';
  }
}

const findById = async (id: string) => {
  try {
    const profile = await Profile.findById(id).exec();
    return profile;

    // await Profile.findById(id, '_id email', (err, profile) => {
    //   if(err) { console.log('Woops, error', err); }
    //   if(profile == null) { console.log('No profile found') }
  
    //   return profile;
    // })
  } catch (error) {
    return 'Error occured'
  }
}

const findByIdAndDelete = (id: string) => {
  try {
    Profile.findByIdAndDelete(id, (err, res) => {
      return res;
    })
  } catch (error) {
    return 'Error occured';
  }
}

const findByIdAndUpdate = async (id: string, data: IProfile ) => {
  try {
    await Profile.findByIdAndUpdate(id, data, (err, updatedProfile) => {
      if(err) { return `An error has occured: ${err}`; }
      return updatedProfile;
    })
  } catch (error) {
    return 'Error occured';
  }
}

const create = async (data: IProfile) => {
  try {
    const newProfile = await new Profile(data).save();
    return newProfile;
  } catch (error) {
    return 'Error occured'
  }
}

export = {
  find,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
  create
}