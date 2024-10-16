import Hero from "./components/Hero";
import Jobs from './components/Jobs';
// import {
//   getSignInUrl,
//   getSignUpUrl,
//   withAuth,
//   signOut,
// } from '@workos-inc/authkit-nextjs';

export default async function Home() {

  // const { user } = await withAuth();

  // // Get the URL to redirect the user to AuthKit to sign in
  // const signInUrl = await getSignInUrl();

  // // Get the URL to redirect the user to AuthKit to sign up
  // const signUpUrl = await getSignUpUrl();

  return (
    <div>
      <Hero/>
      <Jobs/>
    </div>
  );
}
