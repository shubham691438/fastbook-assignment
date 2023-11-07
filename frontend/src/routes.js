import Layout from "./components/Layout";
import QRCodeGenerator from "./pages/QRCodeGenerator";
import Home from "./pages/Home";


const Routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path:"/qrcode-generator/",
          element: <QRCodeGenerator/>
        },

      ],
    },
  ];
  
  export default Routes;