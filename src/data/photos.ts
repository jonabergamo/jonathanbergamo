export type Photo = {
  code: string;
  width: number;
  height: number;
  date: string;
};

export const INSTAGRAM_HANDLE = "@jonab.img";
export const INSTAGRAM_URL = "https://www.instagram.com/jonab.img/";

/**
 * Pulled from the public Instagram grid. Files live in public/photos/<code>.webp
 * (max 1200px) and <code>.thumb.webp (480px square). Add new posts here after
 * dropping the files in; newest first.
 */
export const photos: Photo[] = [
  {
    code: "DXPkqOiAUjN",
    width: 1080,
    height: 719,
    date: "2026-04-17",
  },
  {
    code: "DXDW4WVjFJ0",
    width: 1080,
    height: 1350,
    date: "2026-04-12",
  },
  {
    code: "DWQKlOJDN4U",
    width: 1080,
    height: 1350,
    date: "2026-03-23",
  },
  {
    code: "DWQKXAVjCD2",
    width: 1080,
    height: 1350,
    date: "2026-03-23",
  },
  {
    code: "DWQKMwFDAqE",
    width: 1080,
    height: 1352,
    date: "2026-03-23",
  },
  {
    code: "DV17iyUAfES",
    width: 1080,
    height: 1350,
    date: "2026-03-13",
  },
  {
    code: "DVoXURugXd5",
    width: 1080,
    height: 1351,
    date: "2026-03-08",
  },
  {
    code: "DVjts2YgYPa",
    width: 1080,
    height: 1350,
    date: "2026-03-06",
  },
  {
    code: "DU3USPxAamB",
    width: 1080,
    height: 1439,
    date: "2026-02-17",
  },
  {
    code: "DUs0vISAYU5",
    width: 1080,
    height: 1350,
    date: "2026-02-13",
  },
  {
    code: "DUs0kPqgZfo",
    width: 1080,
    height: 1351,
    date: "",
  },
  {
    code: "DUqs1SpAZsV",
    width: 1080,
    height: 1440,
    date: "",
  },
];
