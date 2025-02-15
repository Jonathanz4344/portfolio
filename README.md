<!-- <p align="center">
  <img src="/public/favicon.svg" width="50" alt="Logo" />
</p> -->
<h1 align="center">Personal portfolio</h1>

<!-- [![Site preview](/public/site-preview.png)](https://hamishw.com) -->

My design portfolio to showcase a few projects. Built with [Remix](https://remix.run/), [Three.js](https://threejs.org/), and [Framer Motion](https://www.framer.com/motion/). 
<!-- View the [live site](https://hamishw.com) or check out a live version of the [components storybook](https://storybook.hamishw.com). -->


## Install & run

Make sure you have nodejs `18.0.0` or higher and npm `8.6.0` or higher installed. Install dependencies with:

```bash
npm install
```

Once it's done start up a local server with:

```bash
npm run dev
```

To view the components storybook:

```bash
npm run dev:storybook
```

<!-- ## Deployment

I've set up the site using Cloudflare for hosting. Deploy the site to Cloudflare Pages:

```bash
npm run deploy
``` -->

<!-- ## FAQs

<details>
  <summary>How do I change the color on the <code>DisplacementSphere</code> (blobby rotating thing in the background).</summary>
  
  You'll need to edit the fragment shader. [Check out this issue for more details](https://github.com/HamishMW/portfolio/issues/19#issuecomment-870996615).
</details>

<details>
  <summary>How do I get the contact form to work?</summary>
  
  To get the contact form working create an AWS account and set up SES (Simple Email service). Then plug in your details into `.dev.vars.example` and rename it to `.dev.vars`. You'll also need to add these as enviroment variables in the Cloudflare dashboard for it to work in production. Or if you don't mind sending through gmail use [nodemailer](https://nodemailer.com/) instead.
</details> -->
