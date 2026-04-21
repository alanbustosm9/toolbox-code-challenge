import { render, screen } from "@testing-library/react-native";
import { VideoPlayer } from "../VideoPlayer";

jest.mock("react-native-video");

const baseProps = {
  videoUrl: "http://example.com/video.mp4",
  imageUrl: "http://example.com/image.jpg",
  playing: false,
  error: false,
  onError: jest.fn(),
};

describe("VideoPlayer", () => {
  it("muestra imagen (thumbnail) cuando no está reproduciendo y sin error", () => {
    render(<VideoPlayer {...baseProps} />);

    expect(screen.getByTestId("thumbnail-image")).toBeTruthy();
    expect(screen.queryByTestId("mock-video")).toBeNull();
  });

  it("muestra el reproductor de video cuando playing=true", () => {
    render(<VideoPlayer {...baseProps} playing={true} />);

    expect(screen.getByTestId("mock-video")).toBeTruthy();
    expect(screen.queryByTestId("thumbnail-image")).toBeNull();
  });

  it("muestra el estado de error cuando error=true", () => {
    render(<VideoPlayer {...baseProps} error={true} />);

    expect(screen.getByText("Video no disponible")).toBeTruthy();
    expect(screen.getByText("⚠️")).toBeTruthy();
  });

  it("el estado de error tiene prioridad sobre playing=true", () => {
    render(<VideoPlayer {...baseProps} error={true} playing={true} />);

    expect(screen.getByText("Video no disponible")).toBeTruthy();
    expect(screen.queryByTestId("mock-video")).toBeNull();
  });

  it("no muestra mensaje de error cuando no hay error", () => {
    render(<VideoPlayer {...baseProps} />);

    expect(screen.queryByText("Video no disponible")).toBeNull();
  });
});
