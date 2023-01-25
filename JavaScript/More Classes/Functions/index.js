const fetchData = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    res.data.forEach((post) => {
      const ul = document.querySelector("ul");
      const li = document.createElement("li");
      li.innerHTML = `${post.title}`;
      ul.append(li);
    });
  } catch (error) {
    console.log(error.response);
  }
};

fetchData();
