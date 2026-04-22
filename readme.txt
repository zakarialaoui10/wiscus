=== Wiscus ===
Contributors:      zakarialaoui10
Donate link: https://ko-fi.com/zakariaelalaoui
Tags:              github, giscus, zikojs, comments, discussions
Tested up to:      6.9
Stable tag:        1.1.2
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Bring GitHub Discussions to WordPress using Giscus.

== Description ==

Wiscus is a lightweight WordPress plugin that integrates the Giscus comment system, allowing you to use GitHub Discussions as a modern comment platform for your website.

Instead of storing comments in your WordPress database, Wiscus connects your site to a GitHub repository and uses Discussions to manage conversations. Each post or page can automatically create and link to a corresponding discussion thread.

Key features:

    - GitHub-powered comments using Giscus
    - Automatic discussion thread creation
    - Lightweight and privacy-friendly (no ads, no tracking)
    - Easy integration via widget or shortcode
    - Customizable themes and mapping options
    - Hot page reloading

== Development ==

This plugin uses a build process (webpack) to generate production files located in /build.

The full, human-readable source code is available here:
https://github.com/zakarialaoui10/wiscus

=== Project structure ===
- /src   : original source code
- /build : compiled/minified production files (used in production)

=== Getting started ===

Clone the repository:
git clone https://github.com/zakarialaoui10/wiscus.git
cd wiscus

Install dependencies:
npm install

Run development mode:
npm run dev

Build for production:
npm run build

=== Forking & Contributing ===

You are welcome to fork and contribute:

1. Fork the repository on GitHub
2. Clone your fork:
   git clone https://github.com/YOUR-USERNAME/wiscus.git
3. Create a new branch:
   git checkout -b feature/your-feature-name
4. Commit your changes and push:
   git push origin feature/your-feature-name
5. Open a Pull Request

=== Notes ===

- Do not edit files inside /build directly.
- Always make changes in /src and rebuild.

== Installation ==

To install the plugin, please follow the following steps:

1. Create a GitHub Repository
    - Go to GitHub and log in.
    - Click New Repository.
    - Give your repository a name (e.g., my-comments).
    - Set it to Public (required for Giscus).
    - Click Create Repository.

2. Enable Discussions
    - Open your repository.
    - Go to Settings → Features.
    - Check Discussions to enable it.
    - Save changes.

3. Install the Giscus App
    - Visit Giscus : https://github.com/apps/giscus.
    - Click Install.
    - Choose your GitHub account or organization.
    - Select the repository you created.
    - Complete the installation.
    
4. Get Your Giscus Configuration
    - Go to the Giscus website.
    - Fill in:
        - Your repository name
        - Discussion category (e.g., General)
        - Customize options (theme, mapping, etc.).
    - Copy the generated configuration (you’ll use it in Wiscus).

5. Install the Wiscus Plugin in WordPress
    - Log in to your WordPress dashboard.
    - Go to Plugins → Add New:
    - Search for Wiscus, or
    - Upload it manually to /wp-content/plugins/.
    - Click Install Now and then Activate.

6. Configure Wiscus
    - Go to Settings → Wiscus.
    - Paste your Giscus configuration.
    - Save changes.

7. Add Wiscus to Your Site
    - Option A: Widget
        - Go to Appearance → Widgets.
        - Add the Wiscus widget to a sidebar or footer.
        - Adjust settings as needed.
    - Option B: Shortcode
        - Add this to any page or post : [wiscus]

== Frequently Asked Questions ==

= A question that someone might have =

= What is Wiscus ? =

Wiscus is a WordPress plugin that integrates the Giscus comment system, allowing you to use GitHub Discussions as a modern commenting platform on your website.

= Do I need a GitHub account to use Wiscus ? =

Yes. Wiscus requires a GitHub account and a public repository with Discussions enabled to store and manage comments.

= How do I connect Wiscus to my site ? =

After installing the plugin, go to Settings > Wiscus and paste your Giscus configuration generated from the Giscus website.

= Why are comments not showing ? =

Make sure your repository is public, Discussions are enabled, the Giscus app is installed, and your configuration settings are correct.

= Can I use Wiscus without widgets ? =

Yes. You can display Wiscus on any page or post using the shortcode [wiscus].

= Can I customize the appearance ? =

Yes. You can customize themes (light/dark), language, and other options through your Giscus configuration.

= Is Wiscus free to use ? =

Yes. Wiscus and Giscus are free to use, but they rely on GitHub’s infrastructure.

== Screenshots ==

1. The screenshot highlights the WordPress Settings menu with the Wiscus option visible at the bottom. It indicates where users can access the Wiscus plugin settings.
2. The screenshot shows the Wiscus settings page in the WordPress dashboard under Settings → Wiscus.
It includes fields for GitHub repository details, mapping, category, and theme configuration.
3. The screenshot shows the WordPress editor with the [wiscus] shortcode added to a page. On the right, the live preview displays the Giscus-powered comment section working with a sample comment.
4. The screenshot shows a GitHub Discussions thread automatically generated by Wiscus for a WordPress page. It includes the post title, linked URL, and a synced comment from the site.

== Changelog ==

= 1.1.2 =
* Replace inline JavaScript in admin.php with proper WordPress script enqueue system using wp_enqueue_script
* Fix WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound warnings by prefixing global variables with "wiscus" keyword.

= 1.1.1 =
* Improved security by escaping all output properly (esc_attr, esc_html)
* Replaced json_encode with wp_json_encode for WordPress compatibility
* Fixed PHPCS warnings (OutputNotEscaped, MissingVersion, DirectQuery, NoCaching)

= 1.1.0 =
* Fix editor attributes
* Add Hot page reloading

= 1.0.0 =
* Initial release

