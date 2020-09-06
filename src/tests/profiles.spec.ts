import Profile from "../models/Profiles";

describe('User functions', () => {

  const user = new Profile({
    firstname: 'Ben', 
    lastname: 'ROUVIERE', 
    email: 'rouviere.benjamin@neuf.fr'
  });

  it("renvoie le nom de l'utilisateur", () => {
    expect(user.firstname).toBe("Ben");
  })

  // it("returns the status of the user", () => {
  //   expect(user.getFullname()).toBe("My name is Ben ROUVIERE.");
  // })
})

