# Crafter CMS with ExpressJS and React Server-side Rendering (SSR) in a Multi-domain Environment

This is a sample Crafter CMS blueprint that demonstrates a multi-domain setup on Crafter CMS with a NodeJS server-side rendered React application which is later hydrated browser-side.

It demonstrates fetching data/content from Crafter CMS both on the server-side and client-side (browser) and the interaction between SSR/hydration. In addition to data fetching, it demonstrates integrating Crafter CMS In-Context Editing into your React/SPA application. 

It uses Redux to help with the app state and hydration. 

1. Download, build and start [Crafter CMS](https://github.com/craftercms/craftercms).
2. While the build is running, use this time to go to your `/etc/hosts` file and add `authoring.sample.com` and `preview.sample.com` to your loopback alias entries. This will allow showcasing how things could work on a real deployment with different domain names.
3. On Crafter CMS, use the "Create site dialog" > "Remote Git Repository" option to create your site based on this repo. Name it **headless-ssr-store**.
4. Run the express server by going into {siteRoot}/sources/react-ssr and running `npm install` followed by `npm run start`. Then, go to `preview.sample.com:3000` to see the Express app. This URL will only work if you previously and successfully configured your `/etc/hosts` file, of course.
5. Navigate/reload to Preview on Crafter CMS and you should see the site.


## Hosts File Example

```
##
# Host Database
##

127.0.0.1	  localhost YourComputerName authoring.sample.com preview.sample.com
255.255.255.255   broadcasthost
::1               localhost YourComputerName authoring.sample.com preview.sample.com
```