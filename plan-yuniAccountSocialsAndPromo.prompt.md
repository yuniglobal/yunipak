## Plan: YUNI account, socials, and promo updates

Update the stale payment copy, fix every broken social link, and refresh the promotional/news messaging so the site consistently points to the new Bank Al Falah account and the two active social profiles.

**Steps**
1. Update the training checkout payment block in `src/components/Courses/cources.tsx` to replace the old Meezan bank/account text with Bank Al Falah and account number `0140-1010831162`.
2. Refresh the top scrolling promo banner in `src/components/PromoBanner.tsx` so it includes the upcoming summer trainings trailer and Open Learning Weekend messaging, while keeping the existing dismiss behavior and layout timing intact.
3. Update the event/news teaser copy in `src/components/Events/Events.tsx` to match the new promotional wording the user asked for, since they clarified the news item belongs on the event page as well as the scrolling list.
4. Replace placeholder or broken social targets in every visible social block: wire Instagram to `https://www.instagram.com/yunipakistan` and LinkedIn to `https://www.linkedin.com/company/yuni-edtech/`, and remove X and Facebook icons/links from `src/components/Footer.tsx` and `src/components/Contact/GetInTouch.tsx`.
5. Scan for any remaining stale references to the old bank details or dead social `href="#"` links, then clean up any duplicates so the new values are consistent everywhere the UI exposes them.

**Relevant files**
- `/home/mujtaba/Projects/yunipak/src/components/Courses/cources.tsx` - training checkout payment copy currently shows the old bank/account values.
- `/home/mujtaba/Projects/yunipak/src/components/PromoBanner.tsx` - top scrolling promo list that currently advertises summer trainings 2026.
- `/home/mujtaba/Projects/yunipak/src/components/Events/Events.tsx` - event/news surface that already carries Bank Al Falah payment copy and should receive the new trailer/open-learning messaging.
- `/home/mujtaba/Projects/yunipak/src/components/Footer.tsx` - footer social icon row still includes X and Facebook and lacks working external links.
- `/home/mujtaba/Projects/yunipak/src/components/Contact/GetInTouch.tsx` - contact page social nodes still use `#` placeholders and include X/Facebook.

**Verification**
1. Run a targeted search for `#` social hrefs and the old account number to confirm only the intended values remain.
2. Run the app or the narrowest available frontend check and visually confirm the banner, event/news text, and social icons render correctly.
3. If the repo has a focused lint/typecheck command, run it for the touched files and inspect diagnostics for any broken imports or JSX issues.

**Decisions**
- Scope includes all visible social icon groups, not just the footer.
- The news request is interpreted as updating the top scrolling promo list and the event page teaser, based on the user’s clarification.
- Keep the existing banner behavior, styling system, and route structure intact; this is a content and link-fix change, not a redesign.
