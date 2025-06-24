# Gynecologist Near Me

A modern, SEO-optimized directory website for finding the best gynecologists and women's healthcare specialists across India. Built with Astro and Tailwind CSS.

## 🌟 Features

- **Modern Design**: Clean, professional, and mobile-responsive design
- **SEO Optimized**: Programmatic SEO with dynamic state pages
- **Animated Elements**: Moving top cities carousel and smooth transitions
- **State-wise Directory**: Complete coverage of all Indian states and cities
- **Doctor Profiles**: Detailed gynecologist information with ratings and reviews
- **Contact Forms**: Easy contact and doctor listing forms
- **Fast Performance**: Built with Astro for optimal loading speeds

## 🚀 Tech Stack

- **Framework**: Astro
- **Styling**: Tailwind CSS
- **Fonts**: Inter (Google Fonts)
- **Icons**: Heroicons (SVG)
- **Database**: Ready for Supabase integration

## 📁 Project Structure

```
gynecologist-near-me/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── data/
│   │   ├── states.js          # Indian states and cities data
│   │   └── gynecologists.js   # Sample doctor data
│   ├── layouts/
│   │   └── Layout.astro       # Main layout with SEO
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   ├── [state].astro      # Dynamic state pages
│   │   ├── about.astro        # About page
│   │   ├── contact.astro      # Contact page
│   │   ├── 404.astro          # Error page
│   │   └── sitemap.xml.js     # Dynamic sitemap
│   └── styles/
│       └── global.css         # Tailwind CSS imports
├── public/
│   └── robots.txt             # SEO robots file
└── README.md
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gynecologist-near-me
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🌐 Pages & Routes

### Static Pages
- `/` - Homepage with state cards and moving cities
- `/about` - About the platform
- `/contact` - Contact form and information
- `/404` - Custom error page

### Dynamic Pages
- `/[state]` - State-specific gynecologist listings
  - Example: `/maharashtra`, `/karnataka`, `/tamil-nadu`

### SEO Pages
- `/sitemap.xml` - Dynamic sitemap for all pages
- `/robots.txt` - Search engine crawling instructions

## 🎨 Design Features

### Homepage
- Hero section with search functionality
- Animated moving cities carousel
- Interactive state cards with hover effects
- Statistics section
- Features showcase
- Call-to-action sections

### State Pages
- SEO-optimized titles and descriptions
- Breadcrumb navigation
- Doctor listings with ratings and specializations
- City grid for the state
- Rich content for SEO

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Accessible design patterns

## 🔧 Customization

### Adding New States/Cities
Update the `src/data/states.js` file with new state and city information.

### Adding Doctor Data
Update the `src/data/gynecologists.js` file or integrate with your Supabase database.

### Styling Changes
Modify Tailwind classes in components or add custom CSS in `src/styles/global.css`.

### SEO Configuration
Update meta tags, titles, and descriptions in the Layout component and individual pages.

## 📊 SEO Features

- **Programmatic SEO**: Automatic generation of state-specific pages
- **Meta Tags**: Comprehensive meta tags for all pages
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Ready for schema markup implementation
- **Sitemap**: Dynamic XML sitemap generation
- **Robots.txt**: Search engine crawling optimization

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push

### Netlify
1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

### Other Platforms
The built files in the `dist` folder can be deployed to any static hosting service.

## 🔮 Future Enhancements

- [ ] Supabase database integration
- [ ] User authentication system
- [ ] Doctor dashboard for profile management
- [ ] Appointment booking system
- [ ] Review and rating system
- [ ] Search functionality
- [ ] Filter and sorting options
- [ ] City-specific pages
- [ ] Blog section for SEO
- [ ] Multi-language support

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and questions:
- Email: support@gynecologistnearme.in
- Website: https://gynecologistnearme.in

---

Built with ❤️ for women's healthcare in India

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
