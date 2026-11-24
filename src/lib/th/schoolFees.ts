// Thai free text for the school fee tables on /th school pages.
// All figures, dates and URLs are read from src/lib/schoolFees.ts; only words live here.
// A label with no entry falls back to the English one.
import type { Inclusion, OneTimeFees } from "@/lib/schoolFees";

export const FEE_NOTE_TH: Record<string, string> = {
  "bangkok-patana-school": "ค่าสมัครเพิ่มเป็น 5,500 ตั้งแต่ 1 สิงหาคม 2026 ค่าอาหารกลางวันรวมเฉพาะ Nursery ถึง Year 6 EAL (ภาษาอังกฤษเป็นภาษาเพิ่มเติม) เป็นข้อบังคับหากโรงเรียนเห็นว่าจำเป็น",
  "international-school-bangkok-isb": "Life Centered Education คิดค่าใช้จ่ายแยกจากค่าเล่าเรียน ที่นั่ง Grade 5 ที่เลือกเรียนโปรแกรมนี้จึงอยู่ที่ประมาณ 2,000,000 บาทต่อปี ไม่แสวงหากำไร 80 ถึง 85% ของค่าเล่าเรียนใช้จ่ายเป็นค่าตอบแทนครู",
  "shrewsbury-international-school-bangkok": "ค่ารับประกันที่นั่ง (Guaranteed Place Fee) 225,000 ซึ่งรวมค่าสมาชิกศิษย์เก่าตลอดชีพ 30,000 เงินมัดจำที่ขอคืนได้ก็เป็น 225,000 เช่นกัน เงินสดที่ต้องจ่ายเมื่อเข้าเรียนจึงเป็น 455,000 บวกค่าเล่าเรียนเทอมแรก",
  "harrow-international-school-bangkok": "อาหารกลางวัน ของว่าง และการสนับสนุนภาษาอังกฤษไม่คิดเงิน หนังสือเรียนไม่คิดเงินถึง Year 9 EAL (ภาษาอังกฤษเป็นภาษาเพิ่มเติม) ฟรีได้สูงสุดสามปีสำหรับ Pre-Nursery ถึง Year 5 ขณะที่ Patana คิดปีละ 105,000 หากปฏิเสธที่นั่งที่โรงเรียนเสนอ ค่าธรรมเนียมบัญชีรอ 225,000 จะไม่คืน",
  "berkeley-international-school-bangkok": "ตัวเลขด้านล่างโรงเรียนให้มาโดยตรงเพื่อตอบอีเมลที่เราขอรูปภาพ โรงเรียนระบุเฉพาะจุดเริ่มต้นและจุดสิ้นสุดของช่วงราคา",
  "bangkok-prep": "ค่าลงทะเบียนแบ่งตามช่วงการเข้าเรียน: Early Years 120,000 Years 1 ถึง 6 160,000 Years 7 ถึง 12 110,000 ค่าเล่าเรียนของเกือบทุกระดับชั้นรวมอาหาร วิชาภาษาโลก ทัศนศึกษา กีฬา และหนังสือรุ่น",
  "ruamrudee-international-school-ris": "718,400 ของ Grade 1 สูงกว่า 686,000 ของ Grades 2 ถึง 5 ค่าเล่าเรียนรายปีรวมค่าเทคโนโลยี 10,000 อาหารกลางวันและของว่าง และค่าพัฒนาโรงเรียน",
  "st-andrews-international-school-bangkok": "ยกเว้นค่าแรกเข้าทั้งหมดสำหรับ Foundation Stage 2, Foundation Stage 3 และ Year 1 Years 7 ถึง 13 จ่าย 90,000 หรือเลือกจ่ายเทอมละ 35,000 รวมค่าสอบ Years 11 และ 13 แล้ว",
  "regents-international-school-bangkok": "ค่าใช้จ่ายครั้งเดียวสามรายการแยกกัน: ค่าสมัคร 5,500 ค่าลงทะเบียน 75,000 ค่าแรกเข้า 95,000 รวม 175,500 โรงเรียนย้ายไปวังทองหลางแล้ว ไม่รวมค่าสมัครสอบ IGCSE และ IB ต่างจาก St Andrews โรงเรียนในเครือ",
  "wells-international-school": "โรงเรียนโฆษณาว่าราคารวมทุกอย่างและไม่มีค่าใช้จ่ายแอบแฝง แต่ตารางค่าเล่าเรียนระบุค่าพัฒนาวิทยาเขต 140,000 เงินมัดจำความเสียหาย 35,000 ค่าอาหารกลางวันภาคบังคับเทอมละ 15,000 และค่า ESL สูงสุดเทอมละ 80,000 ใช้กับวิทยาเขตอ่อนนุช ทองหล่อ และบางนา วิทยาเขตชลบุรีมีตารางค่าเล่าเรียนของตัวเอง",
  "dlts-international-school": "ไม่ประกาศค่าเล่าเรียนระดับ Pre-College (Grades 10 ถึง 12) ค่าเล่าเรียนรวมประกันอุบัติเหตุ จ่ายเต็มปีครั้งเดียวลด 2% และมีส่วนลดพี่น้อง 5% ESL เริ่มต้นเทอมละ 30,000 และค่าสนับสนุนทั้งสองประเภทประเมินเป็นรายกรณี หน้าค่าเล่าเรียนใช้หัวข้อ 2026-2027 แต่สรุปยังเขียน 2025-2026 โปรดยืนยันกับโรงเรียนว่าใช้กับปีการศึกษาใด",
  "denla-british-school": "ค่าเล่าเรียนแต่ละเทอมไม่เท่ากัน แบ่งประมาณ 41/33/26 แทนที่จะแบ่งสามส่วนเท่ากัน ใบแจ้งหนี้ใบแรกจึงสูงที่สุด ค่าแรกเข้า 220,000 ยกเว้นได้ภายใต้ข้อเสนอ Before One และ Sixth Form",
  "wellington-international-school-bangkok": "ค่าเล่าเรียน Year 12 สูงที่สุดในกรุงเทพฯ เท่าที่ตรวจสอบแล้ว ค่าอาหารคิดแยก ต่างจาก Shrewsbury และ Harrow ที่รวมอาหาร",
  "brighton-college-bangkok": "ตัวเลขเหล่านี้ใช้กับวิทยาเขตกรุงเทพกรีฑา Brighton ยังมีวิทยาเขตวิภาวดี เปิดเมื่อสิงหาคม 2025 มีค่าเล่าเรียนและทีมรับสมัครของตัวเอง",
  "kings-college-international-school-bangkok": "การสนับสนุน EAL (ภาษาอังกฤษเป็นภาษาเพิ่มเติม) และความต้องการทางการศึกษาพิเศษตามนโยบายของโรงเรียนรวมอยู่ในค่าเล่าเรียน ขณะที่ Patana คิด EAL ปีละ 105,000 หากไม่มีที่นั่งว่างภายใน 12 เดือน คืนค่าธรรมเนียมบัญชีรอเต็มจำนวน ต่างจาก Harrow",
  "singapore-international-school-of-bangkok": "วิทยาเขตประชาอุทิศ ส่วนลดค่าแรกเข้า 50% ใช้ได้ถึง 30 มิถุนายน 2027 เหลือ 110,000 SISB มีหกวิทยาเขต สี่แห่งอยู่ในกรุงเทพฯ และปริมณฑล แต่ละแห่งมีตารางค่าเล่าเรียนของตัวเอง",
  "international-community-school": "ICS ประกาศค่าเล่าเรียนล่วงหน้าเร็วกว่าโรงเรียนอื่นทั้งหมดเต็มหนึ่งปี นี่คือตารางค่าเล่าเรียนปีการศึกษา 2027/28",
  "ascot-international-school": "ค่าแรกเข้าจ่ายได้ 100,000 ต่อเด็กหนึ่งคน หรือ 180,000 ต่อครอบครัว เป็นตัวเลือกแรกที่เราพบที่คิดต่อครอบครัว ประกันอุบัติเหตุวงเงินค่ารักษาสูงสุด 10,000 ไม่คิดเงิน",
  "garden-international-school-bangkok": "เป็นโรงเรียนเดียวที่เราพบว่าประกาศค่าเอกสารวีซ่านักเรียน คือ 15,000 ค่าแรกเข้า Foundation Stage 60,000 ระดับประถมและมัธยม 120,000 EAL (ภาษาอังกฤษเป็นภาษาเพิ่มเติม) เป็นข้อบังคับเมื่อประเมินแล้วว่าจำเป็น",
  "heathfield-international-school": "มีค่าใช้จ่ายแยกกันสองรายการ รายการละ 100,000 เมื่อเข้าเรียน คือค่าแรกเข้าและค่าผูกพันการเข้าเรียน ซึ่งขอคืนได้เมื่อแจ้งล่วงหน้า 120 วันเรียน ค่าทรัพยากรของ Years 10 ถึง 13 ครอบคลุมค่าสมัครสอบ IGCSE สูงสุด 10 วิชา และ A-Level 4 วิชา โรงเรียนประกาศว่าปรับขึ้นปีละ 3 ถึง 6%",
  "amnuay-silpa-school": "ค่าแรกเข้า 320,000 เป็นค่าใช้จ่ายครั้งเดียวที่สูงที่สุดที่เราพบ โรงเรียนเรียกว่าเงินบริจาคเพื่อการศึกษาที่ไม่คืน สองหลักสูตรคิดค่าเล่าเรียนต่างกัน: International Bilingual และ International",
  "thai-chinese-international-school": "สองเทอมคิดค่าเล่าเรียนไม่เท่ากัน เทอมสองถูกกว่าเทอมแรก กองทุนพัฒนาวิทยาเขต 100,000 ขอคืนได้ ซึ่งไม่ค่อยพบในตลาดนี้ ประกันอุบัติเหตุฟรีวงเงิน 60,000 ต่อครั้ง",
  "australian-international-school-bangkok": "วิทยาเขตซอย 31 ครอบคลุม Foundation ถึง Year 12 วิทยาเขตซอย 20 เปิด Nursery 1 ถึง Year 1 ตารางค่าเล่าเรียนแยกต่างหาก รวมวิชาภาษาต่างประเทศ วิชาเฉพาะทาง ของว่าง และประกันนักเรียน จ่ายเต็มปีครั้งเดียวลด 5%",
  "charter-international-school": "รวมหลายรายการเป็นพิเศษ: ค่าเล่าเรียนครอบคลุมอาหารกลางวัน ของว่าง การสนับสนุนภาษาอังกฤษ การสนับสนุนการเรียนรู้ และกิจกรรมหลังเลิกเรียน ค่าแรกเข้าจ่ายได้ 100,000 ต่อเด็กหนึ่งคน หรือ 150,000 ต่อครอบครัว จ่ายเต็มปีล่วงหน้าลด 5%",
  "basis-international-school-bangkok": "ค่าเล่าเรียนเพิ่ม 2.5 เท่าจาก 265,000 ของ Nursery เป็น 653,500 ของ PreK1 ครอบครัวที่เข้าเรียนตั้งแต่ Nursery มักไม่ได้คาดไว้ ค่าลงทะเบียนเป็นค่าธรรมเนียมบัญชีรอด้วย",
  "xcl-american-school-of-bangkok": "ELL คิดเป็นรายเทอม เทอมละ 56,500 ถึง 60,500 หรือ 113,000 ถึง 121,000 ต่อปี เป็นค่าสนับสนุนภาษาภาคบังคับที่สูงที่สุดที่เราพบ กองทุนพัฒนาโรงเรียน 180,000 ขอคืนได้หลังผ่านไปหนึ่งปีการศึกษา วิทยาเขตสุขุมวิท วิทยาเขต Green Valley แสดงแยก",
  "bangkok-christian-international-school": "255,300 ของ Grades 1 ถึง 2 ถูกกว่า 267,900 ของอนุบาล ค่าแรกเข้าอนุบาล 120,000 ประถมและมัธยมปลาย 140,000 เป็นหนึ่งในหลักสูตรนานาชาติ K-12 ครบวงจรที่ราคาจับต้องได้มากที่สุดในกรุงเทพฯ",
  "trinity-international-school": "เป็นเอกสารค่าเล่าเรียนที่ชัดเจนที่สุดในบรรดาทุกโรงเรียน พร้อมตารางคำนวณเปล่าให้ผู้ปกครองใช้ เงินมัดจำพัฒนา 80,000 ถึง 110,000 ถูกขีดฆ่าและยกเว้นถึง 31 กรกฎาคม 2027 ต้องจ่ายค่าลงทะเบียนใหม่ 15,000 ทุกเดือนกุมภาพันธ์เพื่อรักษาที่นั่งปีการศึกษาถัดไป",
  "niva-american-international-school": "เป็นโรงเรียนเดียวที่ประกาศยอดรวมรายปีแบบรวมทุกอย่างจริงๆ ด้วยตัวเอง รวมค่าเล่าเรียน ค่าเบ็ดเตล็ดแบบเหมา 60,000 และอาหาร ค่าเบ็ดเตล็ดครอบคลุมประกัน หนังสือเรียน ซอฟต์แวร์ ค่าห้องปฏิบัติการ กิจกรรมเสริมหลักสูตร (ECAs) ห้องสมุด ว่ายน้ำ กีฬา และทัศนศึกษา",
  "dprep-bangkok": "ค่าอาหารและสาธารณูปโภค 45,000 ครอบคลุมอาหารทุกมื้อในวันเรียน แบบฝึกหัด สื่อการเรียน ทัศนศึกษาแบบไปกลับสองครั้งตั้งแต่ K1 และประกันอุบัติเหตุ",
  "rbis-international-school": "ค่าลงทะเบียนแบ่งจ่ายได้เทอมละ 40,000 สูงสุดสามเทอม แทนที่จะจ่ายครั้งเดียว กิจกรรมค้างคืนนอกสถานที่ตอนนี้เป็นข้อบังคับแต่คิดค่าใช้จ่ายแยก ส่วนลดจ่ายล่วงหน้า 5% หรือ 10% สำหรับการจ่ายล่วงหน้า 1 ถึง 2 ปี หรือ 3 ปี",
};

export const ON_ENQUIRY_TH: Record<string, string> = {
  "nist-international-school-bangkok": "หน้าค่าเล่าเรียนอธิบายรูปแบบไม่แสวงหากำไรแต่ไม่ระบุตัวเลขใดๆ และขอให้ผู้ปกครองติดต่อ admissions@nist.ac.th",
  "concordian-bangkok-concordian-international-school-bangkok": "หมวดการรับสมัครอธิบายใบสมัคร การเยี่ยมชม กำหนดการ และทุนการศึกษา ไม่มีหน้าค่าเล่าเรียน",
  "dulwich-college-international-school-bangkok": "หมวดการรับสมัครมีเพียงการสอบถาม การสมัคร และการเยี่ยมชม ไม่มีหน้าค่าเล่าเรียน",
  "anglo-singapore-international-school": "หน้าค่าเล่าเรียนระบุสิ่งที่ค่าเล่าเรียนครอบคลุม แล้วขอให้ผู้ปกครองสอบถามตัวเลขกับฝ่ายรับสมัคร",
  "regents-international-school-bangkok-langsuan-campus": "Regent's ประกาศค่าเล่าเรียนเฉพาะวิทยาเขตพระราม 9 เอกสารรับสมัครปีการศึกษา 2026/27 ไม่รวมวิทยาเขตหลังสวน ผู้ปกครองต้องสอบถามค่าเล่าเรียนปัจจุบันกับฝ่ายรับสมัคร (admissions_ls@regents.ac.th)",
  "bromsgrove-international-school-thailand": "ประกาศเงินมัดจำ ค่า EAL ส่วนลดพี่น้อง ค่าสอบ และค่ากิจกรรมค้างคืนนอกสถานที่ แต่ไม่ประกาศตารางค่าเล่าเรียนเอง",
};

export const EXTRA_LABEL_TH: Record<string, string> = {
  "ESL support": "การสนับสนุน ESL",
  "Special needs support": "การสนับสนุนความต้องการพิเศษ",
  "Capital assessment fee": "ค่าประเมินเงินทุน",
  "EAL support Years 1-9": "การสนับสนุน EAL Years 1 ถึง 9",
  "School bus": "รถรับส่งโรงเรียน",
  "Annual fee": "ค่าธรรมเนียมรายปี",
  "Life Centered Education programme": "โปรแกรม Life Centered Education",
  "Boarding, weekly": "หอพักรายสัปดาห์",
  "Boarding, full": "หอพักเต็มรูปแบบ",
  "Lunch": "อาหารกลางวัน",
  "Placement fee (one-time)": "ค่าจัดที่นั่ง (ครั้งเดียว)",
  "EAL support": "การสนับสนุน EAL",
  "Learning resources (one-time)": "ค่าทรัพยากรการเรียน (ครั้งเดียว)",
  "English Language Development": "การพัฒนาภาษาอังกฤษ",
  "Learning support": "การสนับสนุนการเรียนรู้",
  "Explore the Kingdom": "Explore the Kingdom",
  "Enrolment fee (one-time)": "ค่าแรกเข้า (ครั้งเดียว)",
  "Boarding Years 5-6": "หอพัก Years 5 ถึง 6",
  "Boarding Years 7+": "หอพัก Years 7 ขึ้นไป",
  "Boarding personal expenses": "ค่าใช้จ่ายส่วนตัวของหอพัก",
  "Campus development fee (one-time)": "ค่าพัฒนาวิทยาเขต (ครั้งเดียว)",
  "Lunch (mandatory)": "อาหารกลางวัน (บังคับ)",
  "ESL / learning support": "ESL / การสนับสนุนการเรียนรู้",
  "Transport": "การเดินทาง",
  "School meals": "อาหารของโรงเรียน",
  "Assessment fee (one-time)": "ค่าประเมิน (ครั้งเดียว)",
  "Educational resources": "ทรัพยากรการศึกษา",
  "ELS support": "การสนับสนุน ELS",
  "Snack and lunch": "ของว่างและอาหารกลางวัน",
  "Annual capital fee": "ค่าเงินทุนรายปี",
  "ESL course": "คอร์ส ESL",
  "Elementary lunch plan": "แผนอาหารกลางวันระดับประถม",
  "Graduation fee (Grade 12)": "ค่าจบการศึกษา (Grade 12)",
  "Re-enrolment security": "เงินประกันการลงทะเบียนใหม่",
  "Education visa document fee": "ค่าเอกสารวีซ่านักเรียน",
  "French first language": "ภาษาฝรั่งเศสเป็นภาษาแรก",
  "Annual resource fee": "ค่าทรัพยากรรายปี",
  "Resource fee": "ค่าทรัพยากร",
  "ELL / EIP": "ELL / EIP",
  "Chinese for Beginners": "ภาษาจีนสำหรับผู้เริ่มต้น",
  "Military training Grades 10-12": "การฝึกทหาร Grades 10 ถึง 12",
  "Years 7-9 camps deposit": "เงินมัดจำแคมป์ Years 7 ถึง 9",
  "Education resources": "ทรัพยากรการศึกษา",
  "Place guarantee deposit": "เงินมัดจำรับประกันที่นั่ง",
  "Campus development fee": "ค่าพัฒนาวิทยาเขต",
  "Chinese or additional language": "ภาษาจีนหรือภาษาเพิ่มเติม",
  "School development fund": "กองทุนพัฒนาโรงเรียน",
  "ELL programme": "โปรแกรม ELL",
  "EFL support Grades 1-6": "การสนับสนุน EFL Grades 1 ถึง 6",
  "General fees": "ค่าธรรมเนียมทั่วไป",
  "Lunch and morning snack": "อาหารกลางวันและของว่างช่วงเช้า",
  "Re-registration fee (every February)": "ค่าลงทะเบียนใหม่ (ทุกเดือนกุมภาพันธ์)",
  "Food and utilities": "อาหารและสาธารณูปโภค",
  "Development fund": "กองทุนพัฒนา",
  "Meals": "อาหาร",
  "Educational enhancement": "การเสริมการเรียนรู้",
  "Nurture support": "การดูแลเอาใจใส่",
};

// Row labels are mostly level names. Keep the English school terms (Year, Grade,
// Nursery, Reception, PYP, MYP) because that is what the school's own fee table
// says; only the connecting words change. A label with no entry falls back to English.
export const ROW_LABEL_TH: Record<string, string> = {
  "Toddlers to EY3": "Toddlers ถึง EY3",
  "Nursery": "Nursery",
  "Kindergarten": "อนุบาล (Kindergarten)",
  "Toddler": "Toddler",
  "Elementary KG-Grade 5": "ประถม KG ถึง Grade 5",
  "Middle Grades 6-8": "มัธยมต้น Grades 6 ถึง 8",
  "High Grades 9-12": "มัธยมปลาย Grades 9 ถึง 12",
  "Primary 1-3": "ประถม Primary 1 ถึง 3",
  "Primary 4-6": "ประถม Primary 4 ถึง 6",
  "Primary Grades 1-5": "ประถม Grades 1 ถึง 5",
  "Kindergarten K1-K2": "อนุบาล K1 ถึง K2",
  "Kindergarten 1-2": "อนุบาล 1 ถึง 2",
  "Lion Cubs parent-toddler": "Lion Cubs ผู้ปกครองมาด้วย (Parent-Toddler)",
  "Lion Cubs toddler half day": "Lion Cubs Toddler ครึ่งวัน",
  "Lion Cubs toddler full day": "Lion Cubs Toddler เต็มวัน",
  "Pre-Nursery half day": "Pre-Nursery ครึ่งวัน",
  "Pre-Nursery full day": "Pre-Nursery เต็มวัน",
  "Nursery half day": "Nursery ครึ่งวัน",
  "Nursery full day": "Nursery เต็มวัน",
  "Nursery and Reception": "Nursery และ Reception",
  "Nursery-Year 6 (Bilingual)": "Nursery ถึง Year 6 (Bilingual สองภาษา)",
  "Year 7-8 (Bilingual)": "Year 7 ถึง 8 (Bilingual สองภาษา)",
  "Year 9-10 (Bilingual)": "Year 9 ถึง 10 (Bilingual สองภาษา)",
  "Year 11-13 (Bilingual)": "Year 11 ถึง 13 (Bilingual สองภาษา)",
  "Year 7-8 (International)": "Year 7 ถึง 8 (International นานาชาติ)",
  "Year 9-10 (International)": "Year 9 ถึง 10 (International นานาชาติ)",
  "Year 11-13 (International)": "Year 11 ถึง 13 (International นานาชาติ)",
};

/**
 * Generic "X-Y" level ranges ("Year 1-2", "Grades 3-4", "PreK 1-2") are written
 * with a hyphen in the English data. Thai writes "ถึง" instead, matching the
 * rest of the site. Anything in ROW_LABEL_TH wins; other labels get this rewrite.
 */
export function rowLabelTh(label: string): string {
  if (ROW_LABEL_TH[label]) return ROW_LABEL_TH[label];
  return label.replace(/(\w)-(\w)/g, "$1 ถึง $2").replace(/\(([^)]*)\)/g, "($1)");
}

export const INCLUSION_LABEL_TH: Record<Inclusion, string> = {
  "lunch": "อาหารกลางวัน",
  "snacks": "ของว่าง",
  "textbooks": "หนังสือเรียน",
  "residential-trips": "กิจกรรมค้างคืนนอกสถานที่",
  "eal": "การสนับสนุนภาษาอังกฤษ",
  "transport": "รถรับส่ง",
  "uniform": "ชุดนักเรียน",
  "exam-fees": "ค่าสอบ",
  "after-school": "กิจกรรมหลังเลิกเรียน",
};

export const ONE_TIME_LABEL_TH: Record<keyof OneTimeFees, string> = {
  "application": "ค่าสมัคร",
  "registration": "ค่าลงทะเบียนหรือค่าแรกเข้า",
  "refundableDeposit": "เงินมัดจำที่ขอคืนได้",
  "waitingPool": "ค่าธรรมเนียมบัญชีรอ",
};
