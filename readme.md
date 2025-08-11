#3F370F and #F9DACF

firebase login
Initiate your project
Run this command from your app's root directory:

firebase init
Specify your site in firebase.json
Add your site ID to the firebase.json configuration file. After you get set up, see the best practices for multi-site deployment.

{
  "hosting": {
    "site": "servicelocallink2025-2f445",

    "public": "public",
    ...
  }
}
When you're ready, deploy your web app
Put your static files (e.g., HTML, CSS, JS) in your app's deploy directory (the default is "public"). Then, run this command from your app's root directory:

firebase deploy --only hosting:servicelocallink2025-2f445
After deploying, view your app at servicelocallink2025-2f445.web.app

Need help? Check out the Hosting docs



npx eas-cli@latest build:configure
npx eas-cli@latest build --platform android --profile production
