export const metadata ={
    title: "Kiil-Interior Designs",
    description: "Luxury brands for the decerning",
  };
  
  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
     
    );
  }
  