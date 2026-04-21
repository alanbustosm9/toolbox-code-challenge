import { render, screen } from "@testing-library/react-native";
import { VideoCarousel } from "../VideoCarousel";

jest.mock("react-native-video");

const mockCarousels = [
  {
    title: "Horizontal",
    type: "thumbnail",
    items: [
      {
        title: "Video A",
        videoUrl: "http://example.com/a.mp4",
        imageUrl: "http://example.com/a.jpg",
      },
      {
        title: "Video B",
        videoUrl: "http://example.com/b.mp4",
        imageUrl: "http://example.com/b.jpg",
      },
    ],
  },
  {
    title: "Vertical",
    type: "poster",
    items: [
      {
        title: "Video C",
        videoUrl: null,
        imageUrl: "http://example.com/c.jpg",
      },
    ],
  },
];

describe("VideoCarousel", () => {
  it("renderiza los títulos de cada sección", () => {
    render(<VideoCarousel carousels={mockCarousels} />);

    expect(screen.getByText("Horizontal")).toBeTruthy();
    expect(screen.getByText("Vertical")).toBeTruthy();
  });

  it("renderiza los títulos de los videos dentro de cada sección", () => {
    render(<VideoCarousel carousels={mockCarousels} />);

    expect(screen.getByText("Video A")).toBeTruthy();
    expect(screen.getByText("Video B")).toBeTruthy();
    expect(screen.getByText("Video C")).toBeTruthy();
  });

  it("no renderiza secciones cuando carousels es un array vacío", () => {
    render(<VideoCarousel carousels={[]} />);

    expect(screen.queryByText("Horizontal")).toBeNull();
  });

  it("no falla cuando carousels es undefined", () => {
    expect(() => render(<VideoCarousel carousels={undefined} />)).not.toThrow();
  });

  it("renderiza el estado de error en items sin videoUrl", () => {
    render(<VideoCarousel carousels={mockCarousels} />);

    expect(screen.getByText("Video no disponible")).toBeTruthy();
  });

  it("renderiza el botón play en items con videoUrl", () => {
    render(<VideoCarousel carousels={mockCarousels} />);

    const playButtons = screen.getAllByText("▶");
    expect(playButtons.length).toBe(2);
  });
});
