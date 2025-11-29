import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Hero = ({ deviceType = "desktop" }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={deviceType !== "mobile" ? true : false}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      <div>

      <img
        src="https://images.unsplash.com/flagged/1/apple-gear-looking-pretty.jpg?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
"
        alt=""
      />
      </div>
      <div>
      <img
        src="https://media.istockphoto.com/id/667712200/sv/foto/professionellt-p%C3%A5-jobbet-top-view-ofman-arbetar-p%C3%A5-laptop-medan-du-sitter-p%C3%A5-hans-arbetsplats.jpg?s=2048x2048&w=is&k=20&c=ZEo0Pr-DKLYczJfBqn5V5JO3hrYPEA8OGvMhyTIP2JE=
"
        alt=""
      />
      </div>
      <div> 
      <img
        src="https://media.istockphoto.com/id/1304047703/sv/foto/vit-sk%C3%A4rm-b%C3%A4rbar-dator-med-monstera-v%C3%A4xt-kaffekopp-och-smart-telefon-p%C3%A5-tr%C3%A4bord.jpg?s=2048x2048&w=is&k=20&c=VtXwuJAh_Lz91n5mF5HFcUu4e6fD2FvhMTgs12qtWHM=
"
        alt=""
      />
      </div>
      <div>
      <img
        src="https://media.istockphoto.com/id/984592412/sv/foto/aff%C3%A4rsid%C3%A9-laptop-och-station%C3%A4ra-f%C3%B6r-marknadsf%C3%B6ring-och-finansiell-arbeta-p%C3%A5-bord-av-tr%C3%A4-i-office.jpg?s=2048x2048&w=is&k=20&c=RtBzPdcJVWRyiWaQdTZO7siX1cinihjqN7qbC4b8kQQ=
"
        alt=""
      />
      </div>
    </Carousel>
  );
};

export default Hero;
