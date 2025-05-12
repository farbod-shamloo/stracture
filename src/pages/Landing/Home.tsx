import { Button, Typography, Card, Row, Col } from "antd";
import {
  InfoCircleOutlined,
  CheckCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <Title className="text-4xl font-extrabold mb-4 text-center">
        <i
          className="fas fa-user-shield"
          style={{ fontSize: "40px", color: "darkgreen" }}
        ></i>
        به سایت ما خوش آمدید
      </Title>
      <Paragraph className="text-lg mb-8 opacity-80 text-center max-w-2xl">
        ما در اینجا مسیر یادگیری و توسعه شما را تسهیل می‌کنیم. چه به دنبال شروع
        از صفر باشی، چه بخواهی مهارت‌های خود را ارتقا دهی، ما به شما کمک
        می‌کنیم.
      </Paragraph>

      <Button
        type="primary"
        size="large"
        className="bg-pink-600 hover:bg-pink-700 text-white transition duration-300 mb-8"
      >
        شروع کن
      </Button>
<i className="fal fa-bell"></i>

      {/* کارت‌های ویژگی‌ها */}
      <Row gutter={[16, 16]} className="w-full md:w-2/3">
        <Col xs={24} sm={12} md={8}>
          <Card
            className="shadow-lg"
            title={<InfoCircleOutlined />}
            bordered={false}
          >
            <Title level={4}>آموزش‌های اختصاصی</Title>
            <Paragraph>
              ما آموزش‌های متنوعی داریم که می‌تواند به شما کمک کند تا به راحتی
              مسیر یادگیری خود را شروع کنید.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            className="shadow-lg"
            title={<CheckCircleOutlined />}
            bordered={false}
          >
            <Title level={4}>پروژه‌های عملی</Title>
            <Paragraph>
              پس از هر بخش، پروژه‌های عملی برای تثبیت یادگیری خود خواهید داشت.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            className="shadow-lg"
            title={<PlayCircleOutlined />}
            bordered={false}
          >
            <Title level={4}>دوره‌های تعاملی</Title>
            <Paragraph>
              در دوره‌های تعاملی ما، می‌توانید با دیگران همکاری کنید و یاد
              بگیرید.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* دکمه فراخوانی بیشتر */}
      <Button
        type="link"
        size="large"
        className="text-pink-600 hover:text-pink-700 transition duration-300 mt-8"
      >
        اطلاعات بیشتر
      </Button>
    </div>
  );
}

export default Home;
