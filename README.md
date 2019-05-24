# Apps.Maxicon
Rocket.Chat App for Maxicon

## Development Quick Start
Make sure you have https://github.com/RocketChat/Rocket.Chat.Apps-cli installed.

`npm install -g @rocket.chat/apps-cli`


You can now make changes and build with

`rc-apps package`

And to deploy it to a local Rocket.Chat server to test the application

`rc-apps deploy -u RC_USER -p RC_PASSWORD --url=http://localhost:3000`

or to update the installation

`rc-apps deploy -f --update -u RC_USER -p RC_PASSWORD --url=http://localhost:3000`
