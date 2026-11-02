// Simplified Chinese free text for the term-date sections on /zh school pages.
// Dates, ranges and confidence come from src/lib/schoolBreaks.ts; only words live here.
import type { BreakWindowId } from "@/lib/schoolBreaks";

export const WINDOW_LABEL_ZH: Record<BreakWindowId, string> = {
  "oct-2026": "2026年10月半学期假",
  "winter-2026": "2026/27冬季及新年假期",
  "spring-2027": "2027年春季半学期假",
  "songkran-2027": "2027年宋干节 (Songkran) 假期",
  "summer-2027": "2027年暑假",
  "other-2027": "2027年其他学期内假期",
};

export interface CalendarZh {
  sourceLabel?: string;
  caveat?: string;
  /** Keyed by `${break.window}|${break.start}`. */
  breakNotes?: Record<string, string>;
}

export const CALENDAR_ZH: Record<string, CalendarZh> = {
  "bangkok-patana-school": {
    sourceLabel: "官方2026/27学年校历，版本2026.01.22",
    caveat: "Patana 表示，如政府调整公共假期日期，校历可能会修订。",
    breakNotes: {
      "winter-2026|2026-12-19": "第一学期于12月18日结束，第二学期于1月11日开始。整整三周，是此处所列学校中最长的冬季假期。",
      "spring-2027|2027-03-22": "与复活节对齐。受难日 (Good Friday) 为2027年3月26日。",
      "summer-2027|2027-06-28": "2027/28学年的开学日期尚未公布。",
    },
  },
  "st-andrews-international-school-bangkok": {
    sourceLabel: "官方2026/27校历，Dusit / Sathorn / Sukhumvit 107",
    breakNotes: {
      "oct-2026|2026-10-12": "10月13日的拉玛九世国王纪念日 (King Rama IX Memorial Day) 落在假期之内。",
      "winter-2026|2026-12-14": "比 Patana 早整整一周放假，也早一周返校。第二学期于1月5日开始。",
      "spring-2027|2027-02-15": "在2月，而不是3月。比 Patana 早五周。2月19日补休万佛节 (Makha Bucha)，2月22日为教职工日 (staff day)。",
    },
  },
  "kings-college-international-school-bangkok": {
    sourceLabel: "已公布的2026/27重要日期",
    breakNotes: {
      "oct-2026|2026-10-17": "共九天，比 Patana 和 St Andrews 晚一周。预订10月营期前，请先确认孩子所在学校实际在哪一周放假。",
      "other-2027|2027-05-01": "第三学期的假期，在此处所列学校中仅 King's 有。",
      "summer-2027|2027-07-03": "是所列学校中最晚结束学期的，7月2日。",
    },
  },
  "shrewsbury-international-school-bangkok": {
    sourceLabel: "已公布的2026/27学期日期",
    caveat: "Shrewsbury 公布了学期的开始和结束日期，但没有公布半学期假。10月和春季的半学期假仍需确认。",
    breakNotes: {
      "winter-2026|2026-12-19": "第一学期于12月18日结束，第二学期于1月12日开始。",
      "songkran-2027|2027-04-10": "第二学期于4月9日结束。第三学期的开始日期未公布。",
    },
  },
  "international-school-bangkok-isb": {
    sourceLabel: "董事会批准的2026/27学年开学第一天",
    caveat: "ISB 采用美式学期制校历，因此其假期与英式半学期假的模式不对应。完整校历在一个需要用浏览器打开的查看器中。目前只确认了8月13日的开学日期。",
  },
  "kis-international-school-bangkok": {
    sourceLabel: "2026/27校历，更新于2026年5月22日",
    caveat: "校历发布在 PDF.js 查看器中，日期需要人工读取。",
  },
};
