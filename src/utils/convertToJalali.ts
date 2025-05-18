// utils/convertToJalali.ts
export const convertToJalali = (dateString: string) => {
  const gDate = new Date(dateString);
  const gy = gDate.getFullYear();
  const gm = gDate.getMonth() + 1;
  const gd = gDate.getDate();

  const g_d_m = [0, 31, (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
    31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let jy = gy <= 1600 ? 0 : 979;
  let gy2 = gy - (gy <= 1600 ? 621 : 1600);
  let days = (365 * gy2) + Math.floor((gy2 + 3) / 4)
    - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400);

  for (let i = 0; i < gm; ++i) days += g_d_m[i];
  days += gd - 1;

  let j_day_no = days - 79;
  let j_np = Math.floor(j_day_no / 12053);
  j_day_no %= 12053;

  jy += 33 * j_np + 4 * Math.floor(j_day_no / 1461);
  j_day_no %= 1461;

  if (j_day_no >= 366) {
    jy += Math.floor((j_day_no - 1) / 365);
    j_day_no = (j_day_no - 1) % 365;
  }

  const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  let jm = 0;
  while (jm < 12 && j_day_no >= j_days_in_month[jm]) {
    j_day_no -= j_days_in_month[jm];
    jm++;
  }
  const jd = j_day_no + 1;

  return `${jy}/${String(jm + 1).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
};
