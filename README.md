# Crafter CMS with ExpressJS and React Server-side Rendering (SSR) in a Multi-domain Environment

This is a sample Crafter CMS blueprint that demonstrates a multi-domain setup on Crafter CMS with a NodeJS server-side rendered React application which is later hydrated browser-side.

It demonstrates fetching data/content from Crafter CMS both on the server-side and client-side (browser) and the interaction between SSR/hydration. In addition to data fetching, it demonstrates integrating Crafter CMS In-Context Editing into your React/SPA application. 

It uses Redux to help with the app state and hydration. 

1. Download, build and start [Crafter CMS](https://github.com/craftercms/craftercms).
2. While the build is running, use this time to go to your `/etc/hosts` file and add `authoring.sample.com` and `preview.sample.com` to your loopback alias entries. This will allow showcasing how things could work on a real deployment with different domain names.
3. On Crafter CMS, use the "Create site dialog" > "Remote Git Repository" option to create your site based on this repo. Name it **headless-ssr-store**. Note that right after creating the site, you may see a 404 on Preview since your Express app is not running yet.
4. Run the express server by going into {siteRoot}/sources/react-ssr and running `npm install` followed by `npm run start`. Then, go to `preview.sample.com:3000` to see the Express app. This URL will only work if you previously and successfully configured your `/etc/hosts` file, of course.
5. Navigate/reload to Preview on Crafter CMS and you should see the site.

## What you see

Once you've completed the setup and have the site up and running, you can see a initial render with the catalog products. These are fetched server side and then hydrated by ReactDOM once the page loads.

If you click the pagination links, you see the second page coming without page refreshing. The page data is fetched asynchronously by React using the GraphQL endpoint in Crafter CMS. 

**ICE**

If you click the pencil icon on Crafter's top toolbar (In-Context Editing), you should see pencils showing up on each product. Clicking a pencil would open that content entry for editing on the CMS.

## Hosts File Example

```
##
# Host Database
##

127.0.0.1	  localhost YourComputerName authoring.sample.com preview.sample.com
255.255.255.255   broadcasthost
::1               localhost YourComputerName authoring.sample.com preview.sample.com
```