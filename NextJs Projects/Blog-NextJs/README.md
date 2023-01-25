## Getting Started

1 - First, you have to install dependencies for that you have to check package.json.
1.1 - Simply do npm install in the terminal.

2 - Create a config file in the root of the project named next.config.js, it has to be named exactly like this.

3 - Then add the following code configurations for this project. You will need MongoDB URI (connection string) you can get this on MongoDB official website simply log in there, the second thing you need Cloudinary account API endpoint also use the official website for that.

CODE YOU HAVE TO ADD IN NEXT.CONFIG.JS IS====>>>

module.exports = {
env: {
MONGODB_URI:"MONGODB URI WILL GO HERE",
cloudinary_api: "CLOUDINARY ACCOUNT API END POINT WILL GO HERE",
cloudinary_api_account_name: "YOUR ACCOUNT NAME WILL GO HERE",
cloudinaryFolder_name: "UPLOAD PRESET NAME WILL GO HERE",
},
images: {
domains: ["res.cloudinary.com"],
},
};
