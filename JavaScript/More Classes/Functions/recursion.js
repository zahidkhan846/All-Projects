const myself = {
  name: "ZAHID KHAN",
  friends: [
    { name: "Zake", friends: [{ name: "Khan" }] },
    {
      name: "Rashid",
      friends: [
        { name: "Zake", friends: [{ name: "Js" }] },
        {
          name: "Rashid",
          friends: [
            { name: "Zake", friends: [{ name: "Js" }] },
            {
              name: "VsCode",
              friends: [
                { name: "Zake", friends: [{ name: "Zak" }] },
                { name: "React" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const getFriendNames = (person) => {
  const friendsNames = [];
  if (!person.friends) return [];
  person.friends.forEach((friend) => {
    friendsNames.push(friend.name);
    friendsNames.push(...getFriendNames(friend), person.name);
  });
  return friendsNames;
};

console.log(getFriendNames(myself));
