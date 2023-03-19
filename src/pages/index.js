import Head from "next/head";
import { Button, Space } from "antd";
import Link from "next/link";
import Header from "../../common components/header";
import Footer from "../../common components/footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Golfhom</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Space wrap>
          <Link href="/about">
            <Button type="primary" Link>
              About Page
            </Button>
          </Link>
        </Space>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
