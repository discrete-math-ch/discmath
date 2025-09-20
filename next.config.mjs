import nextra from "nextra";

const withNextra = nextra({
  latex: true,
});

const config = withNextra({
  output: "export",
  images: {
    unoptimized: true,
  },
});

export default config;
