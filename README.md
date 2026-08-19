# بطاقات التهنئة 💌

## Project Overview
- **Name**: webapp (بطاقات التهنئة)
- **Goal**: موقع بطاقات تهنئة عربية جاهزة للمشاركة مع الأصدقاء
- **Features**: 3 بطاقات تفاعلية (تهنئة، عيد ميلاد، شكر) مع إمكانية كتابة اسم الشخص وتأثيرات احتفالية (confetti، بالونات، قلوب)

## URLs
- **Sandbox Preview**: https://3000-ilc4lt3e99giulnvrvbes-5c13a017.sandbox.novita.ai
- **Production**: (لم يتم النشر بعد)

## Pages / Routes
| المسار | الوصف |
|--------|-------|
| `/` | الصفحة الرئيسية - اختيار البطاقة |
| `/congrats` | 🎉 بطاقة تهنئة (مبروك) مع confetti |
| `/birthday` | 🎂 بطاقة عيد ميلاد مع بالونات طايرة |
| `/thanks` | 🙏 بطاقة شكر مع قلوب متساقطة |

## User Guide
1. افتح الصفحة الرئيسية واختار نوع البطاقة
2. اكتب اسم الشخص في الخانة واضغط الزرار
3. انسخ لينك الصفحة وابعته للشخص

## Features Not Yet Implemented
- حفظ الاسم في اللينك (query parameter) عشان يظهر تلقائياً عند الفتح
- مشاركة مباشرة على واتساب
- بطاقات إضافية (نجاح، زواج، مولود جديد)

## Deployment
- **Platform**: Cloudflare Pages (sandbox dev حالياً)
- **Status**: ✅ Active (sandbox)
- **Tech Stack**: Hono + TypeScript + TailwindCSS + Canvas Confetti
- **Last Updated**: 2026-08-19
