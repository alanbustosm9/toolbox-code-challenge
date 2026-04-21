import { fireEvent, render, screen } from "@testing-library/react-native";
import { VideoItem } from "../VideoItem";

jest.mock("react-native-video");

const mockVideo = {
  title: "Test Video",
  videoUrl: "http://example.com/video.mp4",
  imageUrl: "http://example.com/image.jpg",
};

describe("VideoItem", () => {
  it("muestra el título del video", () => {
    render(<VideoItem video={mockVideo} type="thumbnail" />);

    expect(screen.getByText("Test Video")).toBeTruthy();
  });

  it("para poster, muestra el título dentro del reproductor abajo", () => {
    render(<VideoItem video={mockVideo} type="poster" />);

    expect(screen.getByTestId("poster-title-overlay")).toBeTruthy();
    expect(screen.getByText("Test Video")).toBeTruthy();
    expect(screen.queryByTestId("video-title-below")).toBeNull();
  });

  it("muestra el botón play inicialmente (no está reproduciendo)", () => {
    render(<VideoItem video={mockVideo} type="thumbnail" />);

    expect(screen.getByText("▶")).toBeTruthy();
  });

  it("muestra la imagen thumbnail antes de reproducir", () => {
    render(<VideoItem video={mockVideo} type="thumbnail" />);

    expect(screen.getByTestId("thumbnail-image")).toBeTruthy();
    expect(screen.queryByTestId("mock-video")).toBeNull();
  });

  it("muestra estado de error cuando videoUrl es null", () => {
    const videoSinUrl = { ...mockVideo, videoUrl: null };
    render(<VideoItem video={videoSinUrl} type="thumbnail" />);

    expect(screen.getByText("Video no disponible")).toBeTruthy();
    expect(screen.queryByText("▶")).toBeNull();
  });

  it("oculta el botón play y muestra el video al presionar", () => {
    render(<VideoItem video={mockVideo} type="thumbnail" />);

    expect(screen.getByText("▶")).toBeTruthy();
    fireEvent.press(screen.getByTestId("video-item"));

    expect(screen.queryByText("▶")).toBeNull();
    expect(screen.getByTestId("mock-video")).toBeTruthy();
  });

  it("no inicia reproducción cuando hay error (videoUrl null)", () => {
    const videoSinUrl = { ...mockVideo, videoUrl: null };
    render(<VideoItem video={videoSinUrl} type="thumbnail" />);

    fireEvent.press(screen.getByTestId("video-item"));

    expect(screen.queryByTestId("mock-video")).toBeNull();
    expect(screen.getByText("Video no disponible")).toBeTruthy();
  });

  it("aplica dimensiones de thumbnail (340px) para tipo thumbnail", () => {
    const { getByTestId } = render(
      <VideoItem video={mockVideo} type="thumbnail" />,
    );
    const item = getByTestId("video-item");

    expect(item.props.style).toMatchObject({ width: 340 });
  });

  it("aplica dimensiones de poster (240px) para tipo poster", () => {
    const { getByTestId } = render(
      <VideoItem video={mockVideo} type="poster" />,
    );
    const item = getByTestId("video-item");

    expect(item.props.style).toMatchObject({ width: 240 });
  });

  it("usa dimensiones de thumbnail como fallback para tipo desconocido", () => {
    const { getByTestId } = render(
      <VideoItem video={mockVideo} type="unknown" />,
    );
    const item = getByTestId("video-item");

    expect(item.props.style).toMatchObject({ width: 340 });
  });
});
