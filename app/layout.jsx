import "@styles/globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "FindMe",
  description: "Find your network",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <head>
      <link rel="icon" href="/assets/images/favicon.png" />
    </head>
    <body>
      <ClerkProvider>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </ClerkProvider>
    </body>
  </html>
);

export default RootLayout;