import { act, renderHook } from "@testing-library/react-native";
import { useVideoPlayer } from "../useVideoPlayer";

describe("useVideoPlayer", () => {
  it("inicia con playing=false y error=false cuando hay videoUrl", () => {
    const { result } = renderHook(() =>
      useVideoPlayer("http://example.com/video.mp4"),
    );

    expect(result.current.playing).toBe(false);
    expect(result.current.error).toBe(false);
  });

  it("inicia con error=true cuando videoUrl es null", () => {
    const { result } = renderHook(() => useVideoPlayer(null));

    expect(result.current.playing).toBe(false);
    expect(result.current.error).toBe(true);
  });

  it("inicia con error=true cuando videoUrl es undefined", () => {
    const { result } = renderHook(() => useVideoPlayer(undefined));

    expect(result.current.error).toBe(true);
  });

  it("alterna playing a true en el primer handlePress", () => {
    const { result } = renderHook(() =>
      useVideoPlayer("http://example.com/video.mp4"),
    );

    act(() => {
      result.current.handlePress();
    });

    expect(result.current.playing).toBe(true);
  });

  it("alterna playing de vuelta a false en el segundo handlePress", () => {
    const { result } = renderHook(() =>
      useVideoPlayer("http://example.com/video.mp4"),
    );

    act(() => {
      result.current.handlePress();
    });
    act(() => {
      result.current.handlePress();
    });

    expect(result.current.playing).toBe(false);
  });

  it("no inicia reproducción cuando error=true", () => {
    const { result } = renderHook(() => useVideoPlayer(null));

    act(() => {
      result.current.handlePress();
    });

    expect(result.current.playing).toBe(false);
  });

  it("handleError pone playing=false y error=true", () => {
    const { result } = renderHook(() =>
      useVideoPlayer("http://example.com/video.mp4"),
    );

    act(() => {
      result.current.handlePress();
    });
    expect(result.current.playing).toBe(true);

    act(() => {
      result.current.handleError();
    });

    expect(result.current.playing).toBe(false);
    expect(result.current.error).toBe(true);
  });
});
