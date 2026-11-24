// Thai free text for the term-date sections on /th school pages.
// Dates, ranges and confidence come from src/lib/schoolBreaks.ts; only words live here.
import type { BreakWindowId } from "@/lib/schoolBreaks";

export const WINDOW_LABEL_TH: Record<BreakWindowId, string> = {
  "oct-2026": "ปิดเทอมกลางภาค ตุลาคม 2026",
  "winter-2026": "ปิดเทอมฤดูหนาวและปีใหม่ 2026/27",
  "spring-2027": "ปิดเทอมกลางภาค ฤดูใบไม้ผลิ 2027",
  "songkran-2027": "ปิดเทอมสงกรานต์ 2027",
  "summer-2027": "ปิดเทอมฤดูร้อน 2027",
  "other-2027": "วันหยุดระหว่างภาคเรียนอื่นๆ ปี 2027",
};

export interface CalendarTh {
  sourceLabel?: string;
  caveat?: string;
  /** Keyed by `${break.window}|${break.start}`. */
  breakNotes?: Record<string, string>;
}

export const CALENDAR_TH: Record<string, CalendarTh> = {
  "bangkok-patana-school": {
    sourceLabel: "ปฏิทินการศึกษาอย่างเป็นทางการ 2026/27 เวอร์ชัน 2026.01.22",
    caveat: "Patana แจ้งว่าปฏิทินอาจมีการแก้ไข หากรัฐบาลเปลี่ยนวันหยุดราชการ",
    breakNotes: {
      "winter-2026|2026-12-19": "เทอม 1 สิ้นสุดวันที่ 18 ธันวาคม เทอม 2 เริ่มวันที่ 11 มกราคม สามสัปดาห์เต็ม เป็นช่วงปิดเทอมฤดูหนาวที่ยาวที่สุดในโรงเรียนที่แสดงไว้ที่นี่",
      "spring-2027|2027-03-22": "ตรงกับเทศกาลอีสเตอร์ วันศุกร์ประเสริฐ (Good Friday) คือวันที่ 26 มีนาคม 2027",
      "summer-2027|2027-06-28": "ยังไม่ประกาศวันเปิดเรียนปีการศึกษา 2027/28",
    },
  },
  "st-andrews-international-school-bangkok": {
    sourceLabel: "ปฏิทินอย่างเป็นทางการ 2026/27 ของ Dusit / Sathorn / Sukhumvit 107",
    breakNotes: {
      "oct-2026|2026-10-12": "วันคล้ายวันสวรรคตรัชกาลที่ 9 (King Rama IX Memorial Day) วันที่ 13 ตุลาคม อยู่ในช่วงปิดเทอม",
      "winter-2026|2026-12-14": "หยุดก่อน Patana เต็มหนึ่งสัปดาห์ และกลับมาเรียนก่อนหนึ่งสัปดาห์ เทอม 2 เริ่มวันที่ 5 มกราคม",
      "spring-2027|2027-02-15": "ตรงกับเดือนกุมภาพันธ์ ไม่ใช่มีนาคม เร็วกว่า Patana ห้าสัปดาห์ หยุดชดเชยวันมาฆบูชา (Makha Bucha) วันที่ 19 กุมภาพันธ์ และวันครู (staff day) วันที่ 22 กุมภาพันธ์",
    },
  },
  "kings-college-international-school-bangkok": {
    sourceLabel: "วันสำคัญ 2026/27 ที่ประกาศแล้ว",
    breakNotes: {
      "oct-2026|2026-10-17": "รวมเก้าวัน ช้ากว่า Patana และ St Andrews หนึ่งสัปดาห์ ก่อนจองแคมป์เดือนตุลาคม โปรดยืนยันว่าโรงเรียนของลูกปิดเทอมสัปดาห์ไหนจริงๆ",
      "other-2027|2027-05-01": "วันหยุดของเทอม 3 มีเฉพาะ King's ในโรงเรียนที่แสดงไว้ที่นี่",
      "summer-2027|2027-07-03": "ปิดภาคเรียนช้าที่สุดในโรงเรียนที่แสดงไว้ คือวันที่ 2 กรกฎาคม",
    },
  },
  "shrewsbury-international-school-bangkok": {
    sourceLabel: "วันที่ของภาคเรียน 2026/27 ที่ประกาศแล้ว",
    caveat: "Shrewsbury ประกาศวันเริ่มและสิ้นสุดของแต่ละเทอม แต่ไม่ประกาศช่วงปิดเทอมกลางภาค ปิดเทอมกลางภาคเดือนตุลาคมและฤดูใบไม้ผลิยังต้องยืนยัน",
    breakNotes: {
      "winter-2026|2026-12-19": "เทอม 1 สิ้นสุดวันที่ 18 ธันวาคม เทอม 2 เริ่มวันที่ 12 มกราคม",
      "songkran-2027|2027-04-10": "เทอม 2 สิ้นสุดวันที่ 9 เมษายน ยังไม่ประกาศวันเริ่มเทอม 3",
    },
  },
  "international-school-bangkok-isb": {
    sourceLabel: "วันเปิดเรียนวันแรก 2026/27 ที่คณะกรรมการอนุมัติ",
    caveat: "ISB ใช้ปฏิทินระบบภาคเรียนแบบอเมริกัน ช่วงปิดเทอมจึงไม่ตรงกับรูปแบบการปิดเทอมกลางภาคแบบอังกฤษ ปฏิทินฉบับเต็มอยู่ในตัวแสดงผลที่ต้องเปิดด้วยเบราว์เซอร์ ขณะนี้ยืนยันได้เพียงวันเปิดเรียน 13 สิงหาคม",
  },
  "kis-international-school-bangkok": {
    sourceLabel: "ปฏิทิน 2026/27 อัปเดตเมื่อ 22 พฤษภาคม 2026",
    caveat: "ปฏิทินเผยแพร่ในตัวแสดงผล PDF.js ต้องอ่านวันที่ด้วยตนเอง",
  },
};
