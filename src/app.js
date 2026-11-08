        /**
         * Sound Synthesizer using Web Audio API (No external MP3 files needed)
         */
        class SoundEffects {
            constructor() {
                this.enabled = true;
                this.ctx = null;
            }
            init() {
                if (!this.ctx) {
                    const AudioCtx = window.AudioContext || window.webkitAudioContext;
                    if (AudioCtx) this.ctx = new AudioCtx();
                }
            }
            play(type) {
                if (!this.enabled) return;
                try {
                    this.init();
                    if (!this.ctx) return;
                    const now = this.ctx.currentTime;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);

                    if (type === 'positive') {
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(523.25, now); // C5
                        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
                        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
                        gain.gain.setValueAtTime(0.15, now);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                        osc.start(now);
                        osc.stop(now + 0.35);
                    } else if (type === 'negative') {
                        osc.type = 'triangle';
                        osc.frequency.setValueAtTime(300, now);
                        osc.frequency.setValueAtTime(220, now + 0.12);
                        gain.gain.setValueAtTime(0.15, now);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                        osc.start(now);
                        osc.stop(now + 0.3);
                    } else if (type === 'click') {
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(600, now);
                        gain.gain.setValueAtTime(0.06, now);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
                        osc.start(now);
                        osc.stop(now + 0.06);
                    }
                } catch (e) {
                    // Ignore audio restriction errors
                }
            }
        }

        const sfx = new SoundEffects();

        /**
         * The 114 surahs: [number, name, ayahs, first juz, last juz], Hafs counting.
         */
        const ALL_SURAHS = [
            [1, 'الفاتحة', 7, 1, 1],
            [2, 'البقرة', 286, 1, 3],
            [3, 'آل عمران', 200, 3, 4],
            [4, 'النساء', 176, 4, 6],
            [5, 'المائدة', 120, 6, 7],
            [6, 'الأنعام', 165, 7, 8],
            [7, 'الأعراف', 206, 8, 9],
            [8, 'الأنفال', 75, 9, 10],
            [9, 'التوبة', 129, 10, 11],
            [10, 'يونس', 109, 11, 11],
            [11, 'هود', 123, 11, 12],
            [12, 'يوسف', 111, 12, 13],
            [13, 'الرعد', 43, 13, 13],
            [14, 'إبراهيم', 52, 13, 13],
            [15, 'الحجر', 99, 14, 14],
            [16, 'النحل', 128, 14, 14],
            [17, 'الإسراء', 111, 15, 15],
            [18, 'الكهف', 110, 15, 16],
            [19, 'مريم', 98, 16, 16],
            [20, 'طه', 135, 16, 16],
            [21, 'الأنبياء', 112, 17, 17],
            [22, 'الحج', 78, 17, 17],
            [23, 'المؤمنون', 118, 18, 18],
            [24, 'النور', 64, 18, 18],
            [25, 'الفرقان', 77, 18, 19],
            [26, 'الشعراء', 227, 19, 19],
            [27, 'النمل', 93, 19, 20],
            [28, 'القصص', 88, 20, 20],
            [29, 'العنكبوت', 69, 20, 21],
            [30, 'الروم', 60, 21, 21],
            [31, 'لقمان', 34, 21, 21],
            [32, 'السجدة', 30, 21, 21],
            [33, 'الأحزاب', 73, 21, 22],
            [34, 'سبأ', 54, 22, 22],
            [35, 'فاطر', 45, 22, 22],
            [36, 'يس', 83, 22, 23],
            [37, 'الصافات', 182, 23, 23],
            [38, 'ص', 88, 23, 23],
            [39, 'الزمر', 75, 23, 24],
            [40, 'غافر', 85, 24, 24],
            [41, 'فصلت', 54, 24, 25],
            [42, 'الشورى', 53, 25, 25],
            [43, 'الزخرف', 89, 25, 25],
            [44, 'الدخان', 59, 25, 25],
            [45, 'الجاثية', 37, 25, 25],
            [46, 'الأحقاف', 35, 26, 26],
            [47, 'محمد', 38, 26, 26],
            [48, 'الفتح', 29, 26, 26],
            [49, 'الحجرات', 18, 26, 26],
            [50, 'ق', 45, 26, 26],
            [51, 'الذاريات', 60, 26, 27],
            [52, 'الطور', 49, 27, 27],
            [53, 'النجم', 62, 27, 27],
            [54, 'القمر', 55, 27, 27],
            [55, 'الرحمن', 78, 27, 27],
            [56, 'الواقعة', 96, 27, 27],
            [57, 'الحديد', 29, 27, 27],
            [58, 'المجادلة', 22, 28, 28],
            [59, 'الحشر', 24, 28, 28],
            [60, 'الممتحنة', 13, 28, 28],
            [61, 'الصف', 14, 28, 28],
            [62, 'الجمعة', 11, 28, 28],
            [63, 'المنافقون', 11, 28, 28],
            [64, 'التغابن', 18, 28, 28],
            [65, 'الطلاق', 12, 28, 28],
            [66, 'التحريم', 12, 28, 28],
            [67, 'الملك', 30, 29, 29],
            [68, 'القلم', 52, 29, 29],
            [69, 'الحاقة', 52, 29, 29],
            [70, 'المعارج', 44, 29, 29],
            [71, 'نوح', 28, 29, 29],
            [72, 'الجن', 28, 29, 29],
            [73, 'المزمل', 20, 29, 29],
            [74, 'المدثر', 56, 29, 29],
            [75, 'القيامة', 40, 29, 29],
            [76, 'الإنسان', 31, 29, 29],
            [77, 'المرسلات', 50, 29, 29],
            [78, 'النبأ', 40, 30, 30],
            [79, 'النازعات', 46, 30, 30],
            [80, 'عبس', 42, 30, 30],
            [81, 'التكوير', 29, 30, 30],
            [82, 'الانفطار', 19, 30, 30],
            [83, 'المطففين', 36, 30, 30],
            [84, 'الانشقاق', 25, 30, 30],
            [85, 'البروج', 22, 30, 30],
            [86, 'الطارق', 17, 30, 30],
            [87, 'الأعلى', 19, 30, 30],
            [88, 'الغاشية', 26, 30, 30],
            [89, 'الفجر', 30, 30, 30],
            [90, 'البلد', 20, 30, 30],
            [91, 'الشمس', 15, 30, 30],
            [92, 'الليل', 21, 30, 30],
            [93, 'الضحى', 11, 30, 30],
            [94, 'الشرح', 8, 30, 30],
            [95, 'التين', 8, 30, 30],
            [96, 'العلق', 19, 30, 30],
            [97, 'القدر', 5, 30, 30],
            [98, 'البينة', 8, 30, 30],
            [99, 'الزلزلة', 8, 30, 30],
            [100, 'العاديات', 11, 30, 30],
            [101, 'القارعة', 11, 30, 30],
            [102, 'التكاثر', 8, 30, 30],
            [103, 'العصر', 3, 30, 30],
            [104, 'الهمزة', 9, 30, 30],
            [105, 'الفيل', 5, 30, 30],
            [106, 'قريش', 4, 30, 30],
            [107, 'الماعون', 7, 30, 30],
            [108, 'الكوثر', 3, 30, 30],
            [109, 'الكافرون', 6, 30, 30],
            [110, 'النصر', 3, 30, 30],
            [111, 'المسد', 5, 30, 30],
            [112, 'الإخلاص', 4, 30, 30],
            [113, 'الفلق', 5, 30, 30],
            [114, 'الناس', 6, 30, 30]
        ].map(([num, name, ayahs, juzFrom, juzTo]) => ({ num, name, ayahs, juzFrom, juzTo }));

        const TOTAL_AYAHS = ALL_SURAHS.reduce((sum, s) => sum + s.ayahs, 0);
        const surahsOfJuz = juz => ALL_SURAHS.filter(s => s.juzFrom <= juz && juz <= s.juzTo);
        const surahByName = name => ALL_SURAHS.find(s => s.name === name);
        const QURAN_SURAHS = { amma: surahsOfJuz(30), tabarak: surahsOfJuz(29) };
        const WEEK_DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        const NIGHT_STARTS_HOUR = 19;
        const NIGHT_ENDS_HOUR = 6;
        const DESKS_PER_ROW = 5;

        /**
         * Color Themes Configuration for Classes
         */
        const CLASS_THEMES = {
            indigo: {
                name: 'أخضر الواحة',
                bgGrad: 'from-indigo-600 to-violet-700',
                lightBg: 'bg-indigo-50',
                text: 'text-indigo-600',
                border: 'border-indigo-200',
                badge: 'bg-indigo-100 text-indigo-700',
                hex: '#4f46e5'
            },
            emerald: {
                name: 'زمرّدي هادئ',
                bgGrad: 'from-emerald-600 to-teal-700',
                lightBg: 'bg-emerald-50',
                text: 'text-emerald-600',
                border: 'border-emerald-200',
                badge: 'bg-emerald-100 text-emerald-700',
                hex: '#059669'
            },
            amber: {
                name: 'ذهبي دافئ',
                bgGrad: 'from-amber-500 to-amber-700',
                lightBg: 'bg-amber-50',
                text: 'text-amber-600',
                border: 'border-amber-200',
                badge: 'bg-amber-100 text-amber-800',
                hex: '#d97706'
            },
            rose: {
                name: 'ورد دمشقي',
                bgGrad: 'from-rose-500 to-rose-700',
                lightBg: 'bg-rose-50',
                text: 'text-rose-600',
                border: 'border-rose-200',
                badge: 'bg-rose-100 text-rose-700',
                hex: '#e11d48'
            },
            sky: {
                name: 'أزرق الأفق',
                bgGrad: 'from-sky-500 to-violet-700',
                lightBg: 'bg-sky-50',
                text: 'text-sky-600',
                border: 'border-sky-200',
                badge: 'bg-sky-100 text-sky-700',
                hex: '#0284c7'
            },
            purple: {
                name: 'خزامى هادئ',
                bgGrad: 'from-purple-500 to-purple-700',
                lightBg: 'bg-purple-50',
                text: 'text-purple-600',
                border: 'border-purple-200',
                badge: 'bg-purple-100 text-purple-700',
                hex: '#9333ea'
            }
        };

        /**
         * Pre-defined Behavior Badges
         */
        const BEHAVIOR_BADGES = [
            { id: 'b_part', label: 'مشاركة متميزة', points: 1, type: 'positive', icon: 'fa-hand-sparkles' },
            { id: 'b_quiet', label: 'التزام وانضباط', points: 1, type: 'positive', icon: 'fa-thumbs-up' },
            { id: 'b_help', label: 'مساعدة الزملاء', points: 2, type: 'positive', icon: 'fa-handshake-angle' },
            { id: 'b_hw', label: 'واجب مكتمل ومرتب', points: 1, type: 'positive', icon: 'fa-book-open-reader' },
            { id: 'b_creative', label: 'إجابة إبداعية', points: 2, type: 'positive', icon: 'fa-lightbulb' },
            { id: 'b_talk', label: 'تحدث بدون إذن', points: -1, type: 'negative', icon: 'fa-comment-slash' },
            { id: 'b_tools', label: 'نسيان الأدوات/الكتاب', points: -1, type: 'negative', icon: 'fa-book-skull' },
            { id: 'b_nohw', label: 'عدم حل الواجب', points: -2, type: 'negative', icon: 'fa-file-circle-xmark' },
            { id: 'b_distract', label: 'انشغال وتشتيت الحلقة', points: -1, type: 'negative', icon: 'fa-triangle-exclamation' }
        ];

        const AVATAR_COLORS = [
            'bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500',
            'bg-sky-500', 'bg-purple-500', 'bg-teal-500', 'bg-pink-500', 'bg-cyan-600', 'bg-orange-500'
        ];

        /**
         * Helper: Today's date in YYYY-MM-DD
         */
        function getTodayStr(offsetDays = 0) {
            const d = new Date();
            d.setDate(d.getDate() + offsetDays);
            // Local calendar date: toISOString() would give the UTC day.
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${d.getFullYear()}-${month}-${day}`;
        }

        /**
         * App-wide settings
         */
        const APPS_SCRIPT_CODE = "__GAS_CODE__";
        const IS_TEST_BUILD = "__TEST_BUILD__";
        const SCHEMA_VERSION = 6;
        const CLOUD_PROTOCOL = 2;
        const CLOUD_DEBOUNCE_MS = 4000;
        const MAX_SNAPSHOTS = 7;
        const DAILY_SNAPSHOT_HOURS = 20;
        // A late student counts as 75% of a present day. An excused day is left out of the rate.
        const LATE_ATTENDANCE_WEIGHT = 0.75;
        const QURAN_STATUSES = ['not_started', 'in_progress', 'memorized', 'mastered'];
        const ATTENDANCE_STATUSES = ['present', 'absent', 'late', 'excused'];

        // Taken before the first render, so a downloaded copy holds no student data or cloud link.
        const PRISTINE_HTML = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;

        /**
         * Helper: escape text before placing it in HTML
         */
        function esc(value) {
            return String(value ?? '').replace(/[&<>"']/g, ch => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
            })[ch]);
        }

        /** Helper: a percentage for display, or a dash when there is nothing to measure yet */
        function fmtPct(value) {
            return value === null || value === undefined ? '—' : `${value}%`;
        }

        /** Helper: one spreadsheet cell, safe from broken quotes and formula injection */
        function csvCell(value) {
            let text = String(value ?? '');
            if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
            return `"${text.replace(/"/g, '""')}"`;
        }

        /** Helper: keep the leading zero of a phone number when opened in Excel */
        function csvPhone(value) {
            const text = String(value ?? '').trim();
            return /^\+?[\d\s-]+$/.test(text) ? `"=""${text}"""` : csvCell(text);
        }

        const minutesOf = time => {
            const [hours, mins] = time.split(':').map(Number);
            return hours * 60 + mins;
        };

        function cleanSessions(list) {
            return (Array.isArray(list) ? list : []).flatMap((s, i) => {
                const valid = /^\d{2}:\d{2}$/;
                const day = Number(s?.day);
                if (!Number.isInteger(day) || day < 0 || day > 6) return [];
                if (!valid.test(s.start) || !valid.test(s.end) || s.start >= s.end) return [];
                return [{ id: isSafeId(s.id) ? s.id : `ses_${day}_${i}`, day, start: s.start, end: s.end }];
            });
        }

        function isSafeId(value) {
            return typeof value === 'string'
                && /^[A-Za-z0-9_-]{1,80}$/.test(value)
                && !['__proto__', 'constructor', 'prototype'].includes(value);
        }

        function requireSafeId(value) {
            if (!isSafeId(value)) throw new Error('معرّف غير صالح في البيانات');
            return value;
        }

        function cleanText(value, max = 500) {
            if (typeof value === 'number') return String(value);
            return typeof value === 'string' ? value.slice(0, max) : '';
        }

        function cleanInt(value, fallback, min = 0) {
            const num = Math.floor(Number(value));
            return Number.isFinite(num) && num >= min ? num : fallback;
        }

        function cleanDate(value) {
            return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : getTodayStr(0);
        }

        function cleanStudent(raw, idx) {
            return {
                ...raw,
                id: requireSafeId(raw?.id),
                name: cleanText(raw.name, 200) || 'طالب بدون اسم',
                guardianPhone: cleanText(raw.guardianPhone, 40),
                notes: cleanText(raw.notes, 1000),
                avatarColor: AVATAR_COLORS.includes(raw.avatarColor) ? raw.avatarColor : AVATAR_COLORS[idx % AVATAR_COLORS.length],
                photo: cleanPhoto(raw.photo),
                studentNumber: cleanText(raw.studentNumber, 40),
                gender: ['ذكر', 'أنثى'].includes(raw.gender) ? raw.gender : '',
                birthDate: /^\d{4}-\d{2}-\d{2}$/.test(raw.birthDate || '') ? raw.birthDate : '',
                email: cleanText(raw.email, 120),
                phone: cleanText(raw.phone, 40),
                parentName: cleanText(raw.parentName, 120),
                parentEmail: cleanText(raw.parentEmail, 120),
                address: cleanText(raw.address, 300),
                custom: Object.fromEntries(Object.entries(raw.custom || {}).filter(([k]) => isSafeId(k)).map(([k, v]) => [k, cleanText(v, 300)])),
                seatIndex: cleanInt(raw.seatIndex, undefined)
            };
        }

        function cleanQuranRecord(raw) {
            const allNames = ALL_SURAHS.map(s => s.name);
            const plan = raw?.nextPlan || {};
            const surahStatus = {};
            Object.entries(raw?.surahStatus || {}).forEach(([num, status]) => {
                if (/^\d{1,3}$/.test(num) && QURAN_STATUSES.includes(status)) surahStatus[num] = status;
            });
            return {
                surahStatus,
                nextPlan: {
                    newSurah: allNames.includes(plan.newSurah) ? plan.newSurah : 'النبأ',
                    newFrom: cleanInt(plan.newFrom, 1, 1),
                    newTo: cleanInt(plan.newTo, 15, 1),
                    revSurah: allNames.includes(plan.revSurah) ? plan.revSurah : 'الناس',
                    revFrom: cleanInt(plan.revFrom, 1, 1),
                    revTo: cleanInt(plan.revTo, 6, 1)
                },
                logs: (Array.isArray(raw?.logs) ? raw.logs : []).map(log => ({
                    id: requireSafeId(log?.id),
                    date: cleanDate(log.date),
                    sessionType: log.sessionType === 'revision' ? 'revision' : 'new',
                    surahName: cleanText(log.surahName, 60),
                    fromAyah: cleanInt(log.fromAyah, 1, 1),
                    toAyah: cleanInt(log.toAyah, 1, 1),
                    errors: cleanInt(log.errors, 0),
                    tajweedNotes: cleanText(log.tajweedNotes, 1000),
                    rating: cleanText(log.rating, 60),
                    lessonKey: LESSON_KEY.test(log.lessonKey || '') ? log.lessonKey : '',
                    reviewKind: ['near', 'far'].includes(log.reviewKind) ? log.reviewKind : '',
                    source: log.source === 'mushaf' ? 'mushaf' : '',
                    time: /^\d{2}:\d{2}$/.test(log.time || '') ? log.time : ''
                }))
            };
        }

        function cleanClass(raw) {
            const students = (Array.isArray(raw?.students) ? raw.students : []).map(cleanStudent);
            const archivedStudents = (Array.isArray(raw.archivedStudents) ? raw.archivedStudents : []).map(cleanStudent);

            // Every student gets exactly one desk.
            const taken = new Set();
            students.forEach(st => {
                if (st.seatIndex !== undefined && !taken.has(st.seatIndex)) taken.add(st.seatIndex);
                else st.seatIndex = undefined;
            });
            students.forEach(st => {
                if (st.seatIndex !== undefined) return;
                let free = 0;
                while (taken.has(free)) free++;
                st.seatIndex = free;
                taken.add(free);
            });

            const attendance = {};
            Object.entries(raw.attendance || {}).forEach(([date, day]) => {
                if (!/^\d{4}-\d{2}-\d{2}(~\d{1,2})?$/.test(date)) return;
                attendance[date] = {};
                Object.entries(day || {}).forEach(([id, status]) => {
                    if (isSafeId(id) && isSafeId(status)) attendance[date][id] = status;
                });
            });

            const grades = {};
            Object.entries(raw.grades || {}).forEach(([stId, row]) => {
                if (!isSafeId(stId)) return;
                grades[stId] = {};
                Object.entries(row || {}).forEach(([assId, val]) => {
                    if (val === '' || val === null || !isSafeId(assId)) return;
                    const num = Number(val);
                    if (Number.isFinite(num)) grades[stId][assId] = num;
                });
            });

            const quranRecords = {};
            Object.entries(raw.quranRecords || {}).forEach(([stId, rec]) => {
                if (isSafeId(stId)) quranRecords[stId] = cleanQuranRecord(rec);
            });

            return {
                ...raw,
                id: requireSafeId(raw.id),
                name: cleanText(raw.name, 200) || 'حلقة بدون اسم',
                subject: cleanText(raw.subject, 200),
                room: cleanText(raw.room, 200),
                schedule: cleanText(raw.schedule, 200),
                theme: Object.hasOwn(CLASS_THEMES, raw.theme) ? raw.theme : 'indigo',
                icon: /^fa-[a-z0-9-]{1,40}$/.test(raw.icon) ? raw.icon : 'fa-book-open',
                code: cleanText(raw.code, 40),
                notes: cleanText(raw.notes, 1000),
                termStart: /^\d{4}-\d{2}-\d{2}$/.test(raw.termStart || '') ? raw.termStart : '',
                termEnd: /^\d{4}-\d{2}-\d{2}$/.test(raw.termEnd || '') ? raw.termEnd : '',
                archived: raw.archived === true,
                deletedAt: /^\d{4}-\d{2}-\d{2}T/.test(raw.deletedAt || '') ? raw.deletedAt.slice(0, 40) : '',
                schedulePlan: cleanPlan(raw.schedulePlan),
                lessonOverrides: cleanOverrides(raw.lessonOverrides),
                lessonNotes: cleanLessonText(raw.lessonNotes),
                lessonStudentNotes: cleanLessonText(raw.lessonStudentNotes, true),
                photo: cleanPhoto(raw.photo),
                categories: (Array.isArray(raw.categories) ? raw.categories : []).filter(c => isSafeId(c?.id)).map(c => ({
                    id: c.id,
                    name: cleanText(c.name, 80) || 'فئة',
                    weight: Math.max(0, Math.min(100, Number(c.weight) || 0))
                })),
                students,
                archivedStudents,
                sessions: cleanSessions(raw.sessions),
                attendance,
                grades,
                quranRecords,
                assessments: (Array.isArray(raw.assessments) ? raw.assessments : []).map(a => ({
                    id: requireSafeId(a?.id),
                    title: cleanText(a.title, 200) || 'تقييم',
                    maxScore: Number(a.maxScore) > 0 ? Number(a.maxScore) : 10,
                    date: /^\d{4}-\d{2}-\d{2}$/.test(a.date || '') ? a.date : '',
                    category: isSafeId(a.category) ? a.category : ''
                })),
                behaviorLogs: (Array.isArray(raw.behaviorLogs) ? raw.behaviorLogs : []).map(log => ({
                    id: requireSafeId(log?.id),
                    studentId: requireSafeId(log.studentId),
                    badgeId: cleanText(log.badgeId, 40),
                    label: cleanText(log.label, 120),
                    points: Number.isFinite(Number(log.points)) ? Number(log.points) : 0,
                    type: log.type === 'negative' ? 'negative' : 'positive',
                    date: cleanDate(log.date),
                    note: cleanText(log.note, 1000),
                    lessonKey: LESSON_KEY.test(log.lessonKey || '') ? log.lessonKey : ''
                }))
            };
        }

        /**
         * Validates data from storage, a file or the cloud, and brings old versions up to date.
         * Throws when the data cannot be trusted, so nothing is replaced by mistake.
         */
        // Tanzil Quran Text (Uthmani, Version 1.1), tanzil.net, CC BY 3.0: gzip of the verbatim file, inserted at build time.
        const QURAN_GZ_B64 = "__QURAN_GZ__";

        function quranTypeLabel(log) {
            if (log?.sessionType === 'new') return 'حفظ جديد';
            if (log?.reviewKind === 'far') return 'مراجعة بعيدة';
            if (log?.reviewKind === 'near') return 'مراجعة قريبة';
            return 'مراجعة';
        }

        const BEHAVIOR_ICONS = ['fa-hand-sparkles', 'fa-thumbs-up', 'fa-handshake-angle', 'fa-book-open-reader', 'fa-lightbulb', 'fa-star', 'fa-clock', 'fa-broom', 'fa-comment-slash', 'fa-book-skull', 'fa-file-circle-xmark', 'fa-triangle-exclamation', 'fa-mobile-screen', 'fa-face-frown'];
        const BEHAVIOR_ICON_NAMES = {
            'fa-hand-sparkles': '✋', 'fa-thumbs-up': '👍', 'fa-handshake-angle': '🤝', 'fa-book-open-reader': '📖', 'fa-lightbulb': '💡',
            'fa-star': '⭐', 'fa-clock': '⏰', 'fa-broom': '🧹', 'fa-comment-slash': '🤐', 'fa-book-skull': '🎒', 'fa-file-circle-xmark': '📄',
            'fa-triangle-exclamation': '⚠️', 'fa-mobile-screen': '📱', 'fa-face-frown': '☹️'
        };
        const DEFAULT_ATTENDANCE_TYPES = [
            { id: 'present', label: 'حاضر', color: '#2f8a5e', countsAs: 'present' },
            { id: 'absent', label: 'غائب', color: '#b0424f', countsAs: 'absent' },
            { id: 'late', label: 'متأخر', color: '#c28a2c', countsAs: 'late' },
            { id: 'excused', label: 'مستأذن', color: '#4d8aaa', countsAs: 'excused' },
            { id: 'left_early', label: 'انصرف مبكرًا', color: '#7a5c7e', countsAs: 'late' }
        ];
        const DEFAULT_GRADE_LEVELS = [
            { label: 'ممتاز', min: 90 }, { label: 'جيد جداً', min: 80 }, { label: 'جيد', min: 70 },
            { label: 'مقبول', min: 60 }, { label: 'يحتاج متابعة', min: 0 }
        ];

        /**
         * Dates: stored as YYYY-MM-DD, always shown as DD/MM/YYYY so day and month never swap.
         */
        const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
        const LESSON_KEY = /^\d{4}-\d{2}-\d{2}(~\d{1,2})?$/;

        function isoToDate(iso) {
            const [y, m, d] = String(iso).split('-').map(Number);
            return new Date(y, (m || 1) - 1, d || 1);
        }

        function dateToIso(date) {
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        }

        function fmtDate(iso) {
            if (!ISO_DATE.test(String(iso || '').slice(0, 10))) return '';
            const [y, m, d] = String(iso).slice(0, 10).split('-');
            return `${d}/${m}/${y}`;
        }

        /** Reads DD/MM/YYYY (also with - or .) or YYYY-MM-DD, and rejects dates that do not exist. */
        function parseDMY(text) {
            const value = String(text || '').trim().replace(/[‎‏⁦-⁩]/g, '')
                .replace(/[٠-٩]/g, ch => String('٠١٢٣٤٥٦٧٨٩'.indexOf(ch)));
            let y;
            let m;
            let d;
            let match = value.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
            if (match) [, y, m, d] = match.map(Number);
            else {
                match = value.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
                if (!match) return null;
                [, d, m, y] = match.map(Number);
            }
            const date = new Date(y, m - 1, d);
            if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
            return dateToIso(date);
        }

        function weekdayName(iso) {
            return ISO_DATE.test(iso) ? WEEK_DAYS[isoToDate(iso).getDay()] : '';
        }

        function lessonKeyOf(iso, index) {
            return index > 1 ? `${iso}~${index}` : iso;
        }

        /** Excel stores dates as days since 1899-12-30. */
        function excelSerialToIso(serial) {
            if (!Number.isFinite(serial) || serial < 1 || serial > 80000) return null;
            const date = new Date(Date.UTC(1899, 11, 30) + Math.round(serial) * 86400000);
            return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
        }

        function normalizeName(name) {
            return String(name || '').trim().replace(/\s+/g, ' ').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').toLowerCase();
        }

        const IMPORT_FIELDS = [
            { key: 'name', label: 'اسم الطالب', words: ['اسم', 'name', 'الطالب'] },
            { key: 'studentNumber', label: 'رقم الطالب', words: ['رقم الطالب', 'الرقم', 'id', 'number'] },
            { key: 'guardianPhone', label: 'جوال ولي الأمر', words: ['جوال ولي', 'هاتف ولي', 'parent phone', 'guardian', 'جوال', 'هاتف', 'phone', 'mobile'] },
            { key: 'parentName', label: 'اسم ولي الأمر', words: ['ولي الأمر', 'اسم الأب', 'parent name', 'father'] },
            { key: 'email', label: 'بريد الطالب', words: ['بريد الطالب', 'email', 'mail', 'بريد'] },
            { key: 'parentEmail', label: 'بريد ولي الأمر', words: ['بريد ولي', 'parent email'] },
            { key: 'gender', label: 'الجنس', words: ['الجنس', 'gender', 'sex'] },
            { key: 'birthDate', label: 'تاريخ الميلاد', words: ['الميلاد', 'birth', 'dob'] },
            { key: 'notes', label: 'ملاحظات', words: ['ملاحظ', 'note'] }
        ];

        function cleanPlan(raw) {
            const time = /^\d{2}:\d{2}$/;
            const m = raw?.monthly || {};
            const start = time.test(m.start) ? m.start : '16:00';
            const days = [...new Set((Array.isArray(m.days) ? m.days : [1]).map(Number).filter(d => Number.isInteger(d) && d >= 1 && d <= 31))].sort((a, b) => a - b);
            const weeks = [...new Set((Array.isArray(m.weeks) ? m.weeks : [1]).map(Number).filter(w => [1, 2, 3, 4, 5, -1].includes(w)))];
            const weekday = Number(m.weekday);
            return {
                type: raw?.type === 'monthly' ? 'monthly' : 'weekly',
                startDate: ISO_DATE.test(raw?.startDate || '') ? raw.startDate : '',
                monthly: {
                    mode: m.mode === 'weekday' ? 'weekday' : 'dates',
                    days: days.length ? days : [1],
                    weekday: Number.isInteger(weekday) && weekday >= 0 && weekday <= 6 ? weekday : 5,
                    weeks: weeks.length ? weeks : [1],
                    start,
                    end: time.test(m.end) && m.end > start ? m.end : `${String(Math.min(23, Number(start.slice(0, 2)) + 1)).padStart(2, '0')}:${start.slice(3)}`
                }
            };
        }

        function cleanOverrides(raw) {
            const out = {};
            Object.entries(raw || {}).forEach(([key, value]) => {
                if (!/^\d{4}-\d{2}-\d{2}@\d{2}:\d{2}$/.test(key) || !value) return;
                if (value.cancelled) out[key] = { cancelled: true };
                else if (ISO_DATE.test(value.date || '') && /^\d{2}:\d{2}$/.test(value.start || '') && /^\d{2}:\d{2}$/.test(value.end || '') && value.start < value.end) {
                    out[key] = { date: value.date, start: value.start, end: value.end };
                }
            });
            return out;
        }

        function cleanLessonText(raw, nested = false) {
            const out = {};
            Object.entries(raw || {}).forEach(([key, value]) => {
                if (!LESSON_KEY.test(key)) return;
                if (nested) {
                    const inner = {};
                    Object.entries(value || {}).forEach(([id, text]) => { if (isSafeId(id) && text) inner[id] = cleanText(text, 500); });
                    if (Object.keys(inner).length) out[key] = inner;
                } else if (value) out[key] = cleanText(value, 2000);
            });
            return out;
        }

        /** Reads the first sheet of an .xlsx file (a zip of XML files) without any library. */
        async function readXlsxRows(buffer) {
            if (typeof DecompressionStream === 'undefined') throw new Error('no-decompress');
            const bytes = new Uint8Array(buffer);
            const view = new DataView(buffer);
            let eocd = -1;
            for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
                if (view.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
            }
            if (eocd < 0) throw new Error('not-zip');
            const decoder = new TextDecoder();
            const entries = {};
            let ptr = view.getUint32(eocd + 16, true);
            for (let n = view.getUint16(eocd + 10, true); n > 0; n--) {
                if (view.getUint32(ptr, true) !== 0x02014b50) throw new Error('bad-zip');
                const nameLen = view.getUint16(ptr + 28, true);
                const name = decoder.decode(bytes.subarray(ptr + 46, ptr + 46 + nameLen));
                entries[name] = { method: view.getUint16(ptr + 10, true), size: view.getUint32(ptr + 20, true), offset: view.getUint32(ptr + 42, true) };
                ptr += 46 + nameLen + view.getUint16(ptr + 30, true) + view.getUint16(ptr + 32, true);
            }
            const read = async name => {
                const e = entries[name];
                if (!e) return null;
                const start = e.offset + 30 + view.getUint16(e.offset + 26, true) + view.getUint16(e.offset + 28, true);
                const data = bytes.subarray(start, start + e.size);
                if (e.method === 0) return decoder.decode(data);
                if (e.method !== 8) throw new Error('bad-zip');
                return new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
            };
            const xml = text => new DOMParser().parseFromString(text, 'application/xml');
            const shared = [];
            const sst = await read('xl/sharedStrings.xml');
            if (sst) [...xml(sst).getElementsByTagName('si')].forEach(si => shared.push([...si.getElementsByTagName('t')].map(t => t.textContent).join('')));

            let sheetPath = 'xl/worksheets/sheet1.xml';
            const workbook = await read('xl/workbook.xml');
            const rels = await read('xl/_rels/workbook.xml.rels');
            if (workbook && rels) {
                const first = xml(workbook).getElementsByTagName('sheet')[0];
                const rid = first?.getAttribute('r:id');
                const rel = [...xml(rels).getElementsByTagName('Relationship')].find(r => r.getAttribute('Id') === rid);
                const target = rel?.getAttribute('Target');
                if (target) sheetPath = target.startsWith('/') ? target.slice(1) : `xl/${target.replace(/^\.\//, '')}`;
            }
            const sheet = await read(sheetPath);
            if (!sheet) throw new Error('no-sheet');
            const colIndex = ref => [...ref.replace(/\d+/g, '')].reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0) - 1;
            const rows = [];
            [...xml(sheet).getElementsByTagName('row')].forEach(row => {
                const cells = [];
                [...row.getElementsByTagName('c')].forEach((cell, i) => {
                    const ref = cell.getAttribute('r');
                    const col = ref ? colIndex(ref) : i;
                    const type = cell.getAttribute('t');
                    const v = cell.getElementsByTagName('v')[0]?.textContent ?? '';
                    let value = v;
                    if (type === 's') value = shared[Number(v)] ?? '';
                    else if (type === 'inlineStr') value = [...cell.getElementsByTagName('t')].map(t => t.textContent).join('');
                    cells[col] = value;
                });
                if (cells.some(c => String(c ?? '').trim())) rows.push(Array.from(cells, c => c ?? ''));
            });
            return rows;
        }

        function cleanSettings(raw) {
            const list = (value, fallback) => (Array.isArray(value) && value.length ? value : fallback);
            const color = c => (/^#[0-9a-f]{6}$/i.test(c) ? c : '#7c7f7a');
            const meanings = ['present', 'absent', 'late', 'excused'];
            const attendanceTypes = list(raw?.attendanceTypes, DEFAULT_ATTENDANCE_TYPES).filter(t => isSafeId(t?.id)).map(t => ({
                id: t.id,
                label: cleanText(t.label, 40) || 'نوع',
                color: color(t.color),
                countsAs: meanings.includes(t.countsAs) ? t.countsAs : 'present'
            }));
            const behaviorTypes = list(raw?.behaviorTypes, BEHAVIOR_BADGES).filter(t => isSafeId(t?.id)).map(t => {
                const points = Math.max(-10, Math.min(10, Math.round(Number(t.points)) || 0));
                return {
                    id: t.id,
                    label: cleanText(t.label, 60) || 'سلوك',
                    points,
                    type: points < 0 ? 'negative' : 'positive',
                    icon: BEHAVIOR_ICONS.includes(t.icon) ? t.icon : 'fa-star'
                };
            });
            const gradeLevels = list(raw?.gradeLevels, DEFAULT_GRADE_LEVELS).map(l => ({
                label: cleanText(l?.label, 30) || '—',
                min: Math.max(0, Math.min(100, Number(l?.min) || 0))
            }));
            const studentFields = (Array.isArray(raw?.studentFields) ? raw.studentFields : []).filter(f => isSafeId(f?.id)).map(f => ({
                id: f.id,
                label: cleanText(f.label, 60) || 'حقل'
            }));
            return {
                attendanceTypes: attendanceTypes.length ? attendanceTypes : DEFAULT_ATTENDANCE_TYPES.map(t => ({ ...t })),
                behaviorTypes: behaviorTypes.length ? behaviorTypes : BEHAVIOR_BADGES.map(t => ({ ...t })),
                gradeLevels,
                studentFields,
                passcodeHash: /^[a-z0-9]{8,80}$/.test(raw?.passcodeHash || '') ? raw.passcodeHash : ''
            };
        }

        const cleanPhoto = value => (typeof value === 'string' && value.length < 40000 && /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(value) ? value : '');

        function sanitizeData(raw) {
            if (!raw || !Array.isArray(raw.classes)) throw new Error('بنية البيانات غير صالحة');
            return {
                ...raw,
                schemaVersion: SCHEMA_VERSION,
                lastUpdated: cleanText(raw.lastUpdated, 40),
                settings: cleanSettings(raw.settings),
                classes: raw.classes.map(cleanClass)
            };
        }

        class CloudError extends Error {
            constructor(code) {
                super(code);
                this.code = code;
            }
        }

        /**
         * Generate Rich Initial Sample Data
         */
        function getInitialDemoData() {
            const today = getTodayStr(0);
            const yesterday = getTodayStr(-1);
            const twoDaysAgo = getTodayStr(-2);

            const createClassData = (id, name, subject, room, schedule, theme, icon, studentNames, assessments, isQuranDefault = false) => {
                const students = studentNames.map((sName, idx) => ({
                    id: `${id}_stu_${idx + 1}`,
                    name: sName,
                    guardianPhone: `050${Math.floor(1000000 + Math.random() * 9000000)}`,
                    notes: idx === 0 ? 'طالب متفوق ومبادر في الأنشطة' : '',
                    avatarColor: AVATAR_COLORS[idx % AVATAR_COLORS.length],
                    seatIndex: idx
                }));

                // Attendance records for 3 days
                const attendance = {
                    [twoDaysAgo]: {},
                    [yesterday]: {},
                    [today]: {}
                };

                students.forEach((st, idx) => {
                    attendance[twoDaysAgo][st.id] = idx === 3 ? 'absent' : (idx === 5 ? 'late' : 'present');
                    attendance[yesterday][st.id] = idx === 7 ? 'excused' : (idx === 2 ? 'late' : 'present');
                    attendance[today][st.id] = idx === 4 ? 'absent' : (idx === 6 ? 'late' : 'present');
                });

                // Sample Behavior Logs
                const behaviorLogs = [
                    { id: `log_${id}_1`, studentId: students[0].id, badgeId: 'b_creative', label: 'إجابة إبداعية', points: 2, type: 'positive', date: today, note: 'حل مسألة التحدي بسرعة' },
                    { id: `log_${id}_2`, studentId: students[1].id, badgeId: 'b_part', label: 'مشاركة متميزة', points: 1, type: 'positive', date: today, note: '' },
                    { id: `log_${id}_3`, studentId: students[2].id, badgeId: 'b_help', label: 'مساعدة الزملاء', points: 2, type: 'positive', date: yesterday, note: '' },
                    { id: `log_${id}_4`, studentId: students[4].id, badgeId: 'b_talk', label: 'تحدث بدون إذن', points: -1, type: 'negative', date: yesterday, note: 'تم التنبيه بهدوء' },
                    { id: `log_${id}_5`, studentId: students[0].id, badgeId: 'b_hw', label: 'واجب مكتمل ومرتب', points: 1, type: 'positive', date: twoDaysAgo, note: '' },
                    { id: `log_${id}_6`, studentId: students[5].id, badgeId: 'b_quiet', label: 'التزام وانضباط', points: 1, type: 'positive', date: today, note: '' },
                    { id: `log_${id}_7`, studentId: students[6].id, badgeId: 'b_tools', label: 'نسيان الأدوات/الكتاب', points: -1, type: 'negative', date: today, note: '' }
                ];

                // Sample Grades
                const grades = {};
                students.forEach((st, idx) => {
                    grades[st.id] = {};
                    assessments.forEach(ass => {
                        const factor = idx % 4 === 0 ? 0.96 : (idx % 3 === 0 ? 0.88 : (idx % 5 === 0 ? 0.74 : 0.82));
                        grades[st.id][ass.id] = Math.min(ass.maxScore, Math.round(ass.maxScore * factor));
                    });
                });

                // Sample Quran Records (Surah status map + logs for New Memorization & Revision)
                const quranRecords = {};
                students.forEach((st, idx) => {
                    const surahStatus = {};
                    // Pre-populate short surahs of Juz Amma for realism
                    const completedCount = isQuranDefault ? Math.max(8, 22 - idx * 2) : Math.max(3, 10 - idx);
                    const reversedAmma = [...QURAN_SURAHS.amma].reverse(); // From An-Nas upwards
                    reversedAmma.forEach((s, sIdx) => {
                        if (sIdx < completedCount) {
                            surahStatus[s.num] = sIdx % 3 === 0 ? 'mastered' : 'memorized';
                        } else if (sIdx === completedCount) {
                            surahStatus[s.num] = 'in_progress';
                        }
                    });

                    const targetCurrentSurah = reversedAmma[completedCount] || QURAN_SURAHS.amma[0];
                    const targetRevSurah = reversedAmma[Math.max(0, completedCount - 2)] || QURAN_SURAHS.amma[36];

                    quranRecords[st.id] = {
                        surahStatus,
                        nextPlan: {
                            newSurah: targetCurrentSurah.name,
                            newFrom: 1,
                            newTo: Math.min(15, targetCurrentSurah.ayahs),
                            revSurah: targetRevSurah.name,
                            revFrom: 1,
                            revTo: targetRevSurah.ayahs
                        },
                        logs: isQuranDefault ? [
                            {
                                id: `qlog_${st.id}_1`,
                                date: today,
                                sessionType: 'new', // 'new' (حفظ جديد) | 'revision' (مراجعة قديم)
                                juz: 'amma',
                                surahName: targetCurrentSurah.name,
                                fromAyah: 1,
                                toAyah: Math.min(10, targetCurrentSurah.ayahs),
                                errors: idx % 3 === 0 ? 0 : 1,
                                tajweedNotes: idx % 2 === 0 ? 'إتقان ممتاز لمخارج الحروف والمدود' : 'انتبه لأحكام النون الساكنة والقلقلة',
                                rating: idx % 3 === 0 ? 'ممتاز متقن' : 'جيد جداً'
                            },
                            {
                                id: `qlog_${st.id}_2`,
                                date: yesterday,
                                sessionType: 'revision',
                                juz: 'amma',
                                surahName: targetRevSurah.name,
                                fromAyah: 1,
                                toAyah: targetRevSurah.ayahs,
                                errors: 0,
                                tajweedNotes: 'مراجعة متقنة وسرد مترابط بلا تردد',
                                rating: 'ممتاز متقن'
                            }
                        ] : []
                    };
                });

                return {
                    id,
                    name,
                    subject,
                    room,
                    schedule,
                    theme,
                    icon,
                    students,
                    attendance,
                    behaviorLogs,
                    assessments,
                    grades,
                    quranRecords
                };
            };

            const demo = {
                version: '3.0',
                lastUpdated: new Date().toISOString(),
                classes: [
                    createClassData(
                        'cls_1',
                        'حلقة الفجر',
                        'حفظ جزء عمّ للمبتدئين',
                        'المسجد - القاعة 1',
                        'الأحد - الثلاثاء - الخميس (الحصة 2)',
                        'indigo',
                        'fa-book-quran',
                        [
                            'عمر بن الخطاب الشمري',
                            'سارة بنت محمد العتيبي',
                            'عبدالله فهد القحطاني',
                            'ليان خالد الدوسري',
                            'يوسف أحمد الغامدي',
                            'نورة سلطان المالكي',
                            'زياد طارق الحربي',
                            'ريم عبدالرحمن الشهري',
                            'حمزة ماجد الزهراني',
                            'جنى وليد السبيعي'
                        ],
                        [
                            { id: 'a1', title: 'اختبار حفظ الشهر', maxScore: 20 },
                            { id: 'a2', title: 'التجويد', maxScore: 10 },
                            { id: 'a3', title: 'الآداب والانضباط', maxScore: 10 },
                            { id: 'a4', title: 'سرد جزء عمّ', maxScore: 60 }
                        ],
                        true
                    ),
                    createClassData(
                        'cls_2',
                        'حلقة الهدى',
                        'حفظ جزء تبارك ومراجعة عمّ',
                        'المسجد - القاعة 2',
                        'الإثنين - الأربعاء (الحصة 3)',
                        'emerald',
                        'fa-book-quran',
                        [
                            'سلطان عبدالعزيز العنزي',
                            'مريم حسن باوزير',
                            'ريان فيصل المطيري',
                            'دانة محمد الرشيدي',
                            'خالد وليد العجمي',
                            'فاطمة علي الحسن',
                            'بدر ناصر الخالدي',
                            'حلا سامي العمري',
                            'تركي فواز الجهني'
                        ],
                        [
                            { id: 'b1', title: 'اختبار حفظ الشهر', maxScore: 25 },
                            { id: 'b2', title: 'التجويد', maxScore: 15 },
                            { id: 'b3', title: 'الآداب والانضباط', maxScore: 10 },
                            { id: 'b4', title: 'سرد جزء تبارك', maxScore: 50 }
                        ],
                        true
                    ),
                    createClassData(
                        'cls_3',
                        'حلقة البيان',
                        'حفظ وتجويد للمتقدمين',
                        'المصلى الرئيسي',
                        'يومياً (الحصة 1)',
                        'amber',
                        'fa-book-quran',
                        [
                            'أنس إبراهيم السالم',
                            'معاذ عبدالملك التميمي',
                            'بلال سعيد الأنصاري',
                            'أسامة ياسر المقرن',
                            'صهيب خالد العريفي',
                            'سلمان فهد الفوزان',
                            'عاصم محمد الشنقيطي',
                            'حذيفة عمر البكري'
                        ],
                        [
                            { id: 'c1', title: 'الحفظ الجديد', maxScore: 40 },
                            { id: 'c2', title: 'المراجعة المتقنة', maxScore: 30 },
                            { id: 'c3', title: 'أحكام التجويد والنطق', maxScore: 20 },
                            { id: 'c4', title: 'الآداب والانضباط', maxScore: 10 }
                        ],
                        true
                    )
                ]
            };
            const sessionsOf = (id, days, start, end) => days.map(day => ({ id: `ses_${id}_${day}`, day, start, end }));
            demo.classes[0].sessions = sessionsOf('c1', [0, 2, 4], '08:00', '08:45');
            demo.classes[1].sessions = sessionsOf('c2', [1, 3], '09:00', '09:45');
            demo.classes[2].sessions = sessionsOf('c3', [0, 1, 2, 3, 4, 5, 6], '16:30', '17:30');
            demo.classes.forEach(c => { c.schedulePlan = { type: 'weekly', startDate: getTodayStr(-20) }; });
            demo.classes[1].schedulePlan = { type: 'monthly', startDate: getTodayStr(-40), monthly: { mode: 'weekday', weekday: 5, weeks: [1, 3], start: '09:00', end: '10:30' } };
            return demo;
        }

        /**
         * Main Application Controller
         */
        const app = {
            STORAGE_KEY: 'moallemkit_pro_data_v1',
            CLOUD_URL_KEY: 'moallemkit_google_cloud_url',
            CLOUD_AUTO_KEY: 'moallemkit_google_auto_sync',
            CLOUD_TOKEN_KEY: 'moallemkit_cloud_token',
            CLOUD_REV_KEY: 'moallemkit_cloud_revision',
            CLOUD_LAST_KEY: 'moallemkit_cloud_last_sync',
            CLOUD_DIRTY_KEY: 'moallemkit_cloud_dirty',
            SNAPSHOT_KEY: 'moallemkit_snapshots',
            THEME_KEY: 'moallemkit_theme',
            ACCOUNT_REV_KEY: 'moallemkit_account_revision',
            ACCOUNT_UID_KEY: 'moallemkit_account_uid',
            ACCOUNT_LAST_KEY: 'moallemkit_account_last_sync',
            ACCOUNT_DIRTY_KEY: 'moallemkit_account_dirty',
            data: null,
            activeClassId: null,
            activeTab: 'seating',
            rearrangeMode: false,
            selectedLesson: 1,
            recite: null,
            quranText: null,
            quranLoading: null,
            pendingReciteAction: null,
            account: null,
            accountRevision: null,
            accountStatus: 'idle',
            accountError: '',
            accountBusy: false,
            accountTimer: null,
            pendingAccountCloud: null,
            circleView: 'seats',
            sessionsFilter: 'upcoming',
            activeSessionKey: '',
            sessionEdit: false,
            planDraft: null,
            importState: null,
            classPhotoDraft: '',
            customizeKind: '',
            behaviorSelectMode: false,
            editBuilding: false,
            suppressSeatClick: false,
            studentPhotoDraft: '',
            renderedFloorSize: 0,
            selectedDate: getTodayStr(0),
            selectedSwapStudentId: null,
            selectedBehaviorStudentIds: [],
            rosterSearchQuery: '',
            // Quran Tracking State
            activeQuranStudentId: null,
            activeQuranJuz: 30, // 1 to 30, or 'all'
            quranSurahSearch: '',
            scheduleDay: null,
            sessionDraft: [],
            animateNext: true,
            themeMode: 'auto', // 'auto' | 'light' | 'dark'
            quranLogFilter: 'all', // 'all' | 'new' | 'revision'
            googleScriptUrl: '',
            autoCloudSync: false,
            cloudToken: '',
            cloudRevision: null,
            cloudLastSync: '',
            cloudStatus: 'idle',
            cloudLastError: '',
            cloudVerifiedUrl: '',
            cloudInFlight: false,
            cloudQueued: false,
            cloudTimer: null,
            cloudDebounceMs: CLOUD_DEBOUNCE_MS,
            pendingReplace: null,
            undoCandidate: null,
            startupWarning: '',
            lastFocused: null,

            init() {
                this.googleScriptUrl = localStorage.getItem(this.CLOUD_URL_KEY) || '';
                this.cloudToken = localStorage.getItem(this.CLOUD_TOKEN_KEY) || '';
                this.autoCloudSync = localStorage.getItem(this.CLOUD_AUTO_KEY) === 'true';
                const revision = localStorage.getItem(this.CLOUD_REV_KEY);
                this.cloudRevision = revision === null ? null : Number(revision);
                this.cloudLastSync = localStorage.getItem(this.CLOUD_LAST_KEY) || '';
                this.themeMode = localStorage.getItem(this.THEME_KEY) || 'auto';
                this.applyTheme();
                this.updateThemeChoices();
                this.loadData();
                this.takeDailySnapshot();
                navigator.storage?.persist?.().catch(() => {});
                this.bindGlobalEvents();
                this.initAccount();
                if ('serviceWorker' in navigator && location.protocol === 'https:') {
                    navigator.serviceWorker.register('sw.js').catch(() => {});
                }
                this.showLockScreen();
                this.showDashboard();
                this.updateCloudFooterBadge();
                setInterval(() => this.tick(), 30000);
                if (this.startupWarning) this.showToast(this.startupWarning, 'error');
                else if (localStorage.getItem(this.CLOUD_DIRTY_KEY) === 'true') this.scheduleCloudSync();
            },

            loadData() {
                const raw = localStorage.getItem(this.STORAGE_KEY);
                if (!raw) {
                    this.data = sanitizeData(getInitialDemoData());
                    this.saveData(true);
                    localStorage.removeItem(this.CLOUD_DIRTY_KEY);
                    return;
                }
                try {
                    const parsed = JSON.parse(raw);
                    this.data = sanitizeData(parsed);
                    if (parsed.schemaVersion !== SCHEMA_VERSION) {
                        localStorage.setItem(`${this.STORAGE_KEY}_before_v${SCHEMA_VERSION}`, raw);
                    }
                } catch (e) {
                    console.error('Error loading saved data:', e);
                    // Keep the unreadable data aside and do not let the demo data reach the cloud.
                    try {
                        localStorage.setItem(`${this.STORAGE_KEY}_unreadable_${Date.now()}`, raw);
                    } catch (storageError) {
                        console.error('Could not keep the unreadable data:', storageError);
                    }
                    this.autoCloudSync = false;
                    this.startupWarning = 'تعذرت قراءة البيانات المحفوظة، وعُرضت بيانات تجريبية. استرجع نسخة من «النسخ التلقائية» أو من ملف احتياطي.';
                    this.data = sanitizeData(getInitialDemoData());
                }
            },

            saveData(silent = false) {
                try {
                    this.data.lastUpdated = new Date().toISOString();
                    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
                    localStorage.setItem(this.CLOUD_DIRTY_KEY, 'true');
                    this.animateSaveBadge();
                    this.updateCloudFooterBadge();
                    if (!silent) {
                        this.scheduleCloudSync();
                        localStorage.setItem(this.ACCOUNT_DIRTY_KEY, 'true');
                        this.scheduleAccountSync();
                    }
                    return true;
                } catch (e) {
                    const txt = document.getElementById('saveStatusText');
                    if (txt) txt.textContent = 'فشل الحفظ';
                    this.showToast('تعذر حفظ البيانات في المتصفح. صدّر ملف JSON الآن حتى لا تضيع', 'error');
                    return false;
                }
            },

            animateSaveBadge() {
                const icon = document.getElementById('saveStatusIcon');
                const txt = document.getElementById('saveStatusText');
                if (!icon || !txt) return;
                icon.className = 'fa-solid fa-check-double text-emerald-600 score-bounce';
                txt.textContent = 'تم الحفظ تلقائياً';
                setTimeout(() => {
                    icon.className = 'fa-solid fa-cloud-arrow-up text-emerald-600';
                    txt.textContent = 'محفوظ تلقائياً';
                }, 1500);
            },

            manualSaveWithFeedback() {
                if (!this.saveData()) return;
                sfx.play('positive');
                this.showToast('تم حفظ جميع التغييرات في هذا المتصفح');
            },

            updateCloudFooterBadge() {
                const badge = document.getElementById('footerSyncBadge');
                if (!badge) return;
                const failing = ['error', 'conflict', 'needs_update'].includes(this.cloudStatus);
                const linked = this.cloudReady();
                badge.className = `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold border ${
                    failing ? 'text-rose-700 bg-rose-50 border-rose-200'
                        : linked ? 'text-indigo-700 bg-indigo-50 border-indigo-200'
                            : 'text-emerald-600 bg-emerald-50 border-emerald-200'
                }`;
                badge.textContent = linked ? this.cloudStatusText() : 'محفوظ في هذا المتصفح فقط';
            },

            getActiveClass() {
                return this.data.classes.find(c => c.id === this.activeClassId) || null;
            },

            toggleSound() {
                sfx.enabled = !sfx.enabled;
                const btn = document.getElementById('soundToggleBtn');
                if (sfx.enabled) {
                    btn.innerHTML = '<i class="fa-solid fa-volume-high text-sm text-indigo-600"></i>';
                    sfx.play('click');
                    this.showToast('تم تفعيل المؤثرات الصوتية', 'info');
                } else {
                    btn.innerHTML = '<i class="fa-solid fa-volume-xmark text-sm text-slate-400"></i>';
                    this.showToast('تم كتم المؤثرات الصوتية', 'info');
                }
            },

            showToast(message, type = 'success') {
                const container = document.getElementById('toastContainer');
                const toast = document.createElement('div');
                const styles = {
                    success: 'bg-slate-900 text-white border-emerald-500',
                    error: 'bg-rose-600 text-white border-rose-300',
                    info: 'bg-indigo-600 text-white border-indigo-400'
                };
                const icons = {
                    success: 'fa-circle-check text-emerald-400',
                    error: 'fa-circle-exclamation text-white',
                    info: 'fa-circle-info text-indigo-200'
                };
                const undoJson = this.undoCandidate;

                toast.className = `flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border-r-4 text-xs sm:text-sm font-bold animate-pop pointer-events-auto ${styles[type] || styles.success}`;
                const icon = document.createElement('i');
                icon.className = `fa-solid ${icons[type] || icons.success} text-base`;
                const text = document.createElement('span');
                text.className = 'flex-1';
                text.textContent = message;
                toast.append(icon, text);
                if (undoJson) {
                    const undo = document.createElement('button');
                    undo.className = 'underline font-extrabold shrink-0 px-1';
                    undo.textContent = 'تراجع';
                    undo.onclick = () => {
                        toast.remove();
                        this.data = JSON.parse(undoJson);
                        this.saveData();
                        this.refreshView();
                        this.showToast('تم التراجع');
                    };
                    toast.append(undo);
                }
                container.appendChild(toast);
                setTimeout(() => {
                    toast.style.opacity = '0';
                    toast.style.transition = 'opacity 0.25s ease';
                    setTimeout(() => toast.remove(), 250);
                }, undoJson ? 8000 : (type === 'error' ? 6000 : 2800));
            },

            refreshView() {
                if (this.activeClassId) this.renderClassWorkspace();
                else this.renderDashboard();
            },

            /* ==========================================
               CALCULATIONS & ANALYTICS HELPERS
               ========================================== */
            getClassAttendanceRate(cls) {
                let counted = 0;
                let score = 0;
                Object.values(cls.attendance || {}).forEach(day => {
                    cls.students.forEach(st => {
                        const meaning = this.attendanceMeaning((day || {})[st.id]);
                        if (meaning === 'present') { counted++; score += 1; }
                        else if (meaning === 'late') { counted++; score += LATE_ATTENDANCE_WEIGHT; }
                        else if (meaning === 'absent') counted++;
                    });
                });
                return counted === 0 ? null : Math.round((score / counted) * 100);
            },

            getStudentAttendanceStats(cls, studentId) {
                const dates = Object.keys(cls.attendance || {}).sort().reverse();
                let present = 0, absent = 0, late = 0, excused = 0;
                dates.forEach(d => {
                    const status = this.attendanceMeaning((cls.attendance[d] || {})[studentId]);
                    if (status === 'present') present++;
                    else if (status === 'absent') absent++;
                    else if (status === 'late') late++;
                    else if (status === 'excused') excused++;
                });
                const total = present + absent + late + excused;
                const counted = present + absent + late;
                const rate = counted === 0 ? null : Math.round(((present + late * LATE_ATTENDANCE_WEIGHT) / counted) * 100);
                return { present, absent, late, excused, total, rate };
            },

            getStudentBehaviorStats(cls, studentId) {
                const logs = (cls.behaviorLogs || []).filter(l => l.studentId === studentId);
                let pos = 0, neg = 0;
                logs.forEach(l => {
                    if (l.points > 0) pos += l.points;
                    else neg += Math.abs(l.points);
                });
                return { positive: pos, negative: neg, net: pos - neg, logs };
            },

            getStudentGradeStats(cls, studentId) {
                const assessments = cls.assessments || [];
                const marks = (cls.grades || {})[studentId] || {};
                const categories = cls.categories || [];
                const weighted = categories.some(c => c.weight > 0);
                let totalMax = 0;
                let earned = 0;
                let gradedCount = 0;
                const perCategory = {};
                // Only recorded scores count: an assessment with no score is not a zero.
                assessments.forEach(a => {
                    const val = marks[a.id];
                    if (val === undefined || val === null || val === '') return;
                    totalMax += Number(a.maxScore) || 0;
                    earned += Number(val) || 0;
                    gradedCount++;
                    const bucket = perCategory[a.category] || (perCategory[a.category] = { earned: 0, max: 0 });
                    bucket.earned += Number(val) || 0;
                    bucket.max += Number(a.maxScore) || 0;
                });
                const totalAssessments = assessments.length;
                if (gradedCount === 0) {
                    return { earned, totalMax, gradedCount, totalAssessments, pct: null, label: 'لم يُقيَّم بعد', badgeClass: 'bg-slate-100 text-slate-600' };
                }
                let pct = Math.round((earned / totalMax) * 100);
                if (weighted) {
                    let weightSum = 0;
                    let score = 0;
                    categories.forEach(c => {
                        const bucket = perCategory[c.id];
                        if (!bucket || !c.weight || !bucket.max) return;
                        weightSum += c.weight;
                        score += c.weight * (bucket.earned / bucket.max);
                    });
                    if (weightSum) pct = Math.round((score / weightSum) * 100);
                }
                const level = this.gradeLevelFor(pct);
                return { earned, totalMax, gradedCount, totalAssessments, pct, label: level.label, badgeClass: level.badgeClass };
            },

            getClassAverageGrade(cls) {
                const graded = cls.students.map(st => this.getStudentGradeStats(cls, st.id).pct).filter(pct => pct !== null);
                if (!graded.length) return null;
                return Math.round(graded.reduce((sum, pct) => sum + pct, 0) / graded.length);
            },

            ensureStudentQuranRecord(cls, studentId) {
                if (!cls.quranRecords) cls.quranRecords = {};
                if (!cls.quranRecords[studentId]) {
                    cls.quranRecords[studentId] = {
                        surahStatus: {},
                        nextPlan: { newSurah: 'النبأ', newFrom: 1, newTo: 15, revSurah: 'الناس', revFrom: 1, revTo: 6 },
                        logs: []
                    };
                }
                return cls.quranRecords[studentId];
            },

            getStudentQuranStats(cls, studentId) {
                const rec = this.ensureStudentQuranRecord(cls, studentId);
                const statusMap = rec.surahStatus || {};
                const isDone = s => ['memorized', 'mastered'].includes(statusMap[s.num]);
                const doneSurahs = ALL_SURAHS.filter(isDone);
                const ammaCompleted = QURAN_SURAHS.amma.filter(isDone).length;
                const tabarakCompleted = QURAN_SURAHS.tabarak.filter(isDone).length;
                const ammaPct = Math.round((ammaCompleted / QURAN_SURAHS.amma.length) * 100);
                const tabarakPct = Math.round((tabarakCompleted / QURAN_SURAHS.tabarak.length) * 100);
                const memorizedAyahs = doneSurahs.reduce((sum, s) => sum + s.ayahs, 0);
                const juzProgress = {};
                for (let juz = 1; juz <= 30; juz++) {
                    const inJuz = surahsOfJuz(juz);
                    juzProgress[juz] = Math.round((inJuz.filter(isDone).length / inJuz.length) * 100);
                }
                const logs = rec.logs || [];
                const newLogsCount = logs.filter(l => l.sessionType === 'new').length;
                const revLogsCount = logs.filter(l => l.sessionType === 'revision').length;

                return {
                    ammaCompleted,
                    ammaTotal: QURAN_SURAHS.amma.length,
                    ammaPct,
                    tabarakCompleted,
                    tabarakTotal: QURAN_SURAHS.tabarak.length,
                    tabarakPct,
                    totalCompleted: doneSurahs.length,
                    masteredCount: ALL_SURAHS.filter(s => statusMap[s.num] === 'mastered').length,
                    memorizedAyahs,
                    quranPct: Math.round((memorizedAyahs / TOTAL_AYAHS) * 100),
                    juzProgress,
                    fullJuzCount: Object.values(juzProgress).filter(pct => pct === 100).length,
                    logs,
                    newLogsCount,
                    revLogsCount,
                    lastLog: logs.length > 0 ? logs[0] : null
                };
            },

            getInitials(name) {
                const parts = name.trim().split(/\s+/);
                if (parts.length >= 2) {
                    return parts[0][0] + ' ' + parts[parts.length - 1][0];
                }
                return name.slice(0, 2);
            },

            /* ==========================================
               NAVIGATION & VIEW SWITCHING
               ========================================== */
            showDashboard() {
                this.activeClassId = null;
                this.activeQuranStudentId = null;
                document.body.classList.remove('in-class');
                document.getElementById('scheduleView').classList.add('hidden');
                this.setNavActive('home');
                document.getElementById('dashboardView').classList.remove('hidden');
                document.getElementById('classWorkspaceView').classList.add('hidden');
                document.getElementById('classNavBar').classList.add('hidden');
                document.getElementById('headerBreadcrumb').classList.add('hidden');
                document.getElementById('headerAddClassBtn').classList.remove('hidden');
                this.renderDashboard();
            },

            openClass(classId, tab = null) {
                this.activeClassId = classId;
                if (tab) this.activeTab = tab;
                this.selectedSwapStudentId = null;
                this.selectedBehaviorStudentIds = [];
                this.activeQuranStudentId = null;
                this.rearrangeMode = false;
                this.behaviorSelectMode = false;

                document.body.classList.add('in-class');
                this.animateNext = true;
                this.setNavActive('home');
                document.getElementById('scheduleView').classList.add('hidden');
                document.getElementById('dashboardView').classList.add('hidden');
                document.getElementById('classWorkspaceView').classList.remove('hidden');
                document.getElementById('classNavBar').classList.remove('hidden');
                document.getElementById('headerBreadcrumb').classList.remove('hidden');
                document.getElementById('headerBreadcrumb').classList.add('flex');
                document.getElementById('headerAddClassBtn').classList.add('hidden');

                // Populate quick switcher
                const switcher = document.getElementById('quickClassSwitcher');
                switcher.innerHTML = this.activeClasses().map(c =>
                    `<option value="${c.id}" ${c.id === classId ? 'selected' : ''}>${esc(c.name)} (${esc(c.subject)})</option>`
                ).join('');

                this.renderClassWorkspace();
            },

            switchTab(tabName) {
                sfx.play('click');
                this.activeTab = tabName;
                this.animateNext = true;
                this.rearrangeMode = false;
                this.behaviorSelectMode = false;
                this.selectedSwapStudentId = null;
                if (tabName !== 'quran') {
                    this.activeQuranStudentId = null;
                }
                this.renderClassWorkspace();
            },

            /* ==========================================
               TIMETABLE: SESSIONS OF CLASSES AND QURAN CIRCLES
               ========================================== */
            sessionLabel() {
                return 'حصة';
            },

            scheduleText(cls) {
                const sessions = cls.sessions || [];
                if (this.planOf(cls).type === 'monthly') return this.monthlyText(this.planOf(cls).monthly);
                if (!sessions.length) return cls.schedule || 'لا مواعيد بعد';
                const days = [...new Set(sessions.map(s => s.day))].map(d => WEEK_DAYS[d]);
                const first = [...sessions].sort((a, b) => a.start.localeCompare(b.start))[0];
                const dayText = days.length === 7 ? 'كل يوم' : days.join('، ');
                return `${dayText} • ${first.start}`;
            },

            allSessions() {
                return this.activeClasses().flatMap(cls => (cls.sessions || []).map(session => ({ ...session, cls })));
            },

            sessionsOfDay(day) {
                const today = new Date();
                const date = new Date(today);
                date.setDate(today.getDate() + (day - today.getDay()));
                const iso = dateToIso(date);
                return this.activeClasses()
                    .flatMap(cls => this.occurrences(cls, iso, iso).filter(o => !o.cancelled).map(o => ({ ...o, id: o.origKey, day, cls })))
                    .sort((a, b) => a.start.localeCompare(b.start));
            },

            hasConflict(session) {
                return this.sessionsOfDay(session.day).some(other =>
                    other.id !== session.id && other.start < session.end && session.start < other.end
                );
            },

            /** Places each of today's sessions in time: done, now, next or later. */
            todayTimeline(now = new Date()) {
                const minutes = now.getHours() * 60 + now.getMinutes();
                let nextTaken = false;
                return this.sessionsOfDay(now.getDay()).map(session => {
                    const start = minutesOf(session.start);
                    const end = minutesOf(session.end);
                    let state = 'later';
                    if (minutes >= end) state = 'done';
                    else if (minutes >= start) state = 'now';
                    else if (!nextTaken) {
                        state = 'next';
                        nextTaken = true;
                    }
                    return { ...session, state, startsIn: start - minutes, endsIn: end - minutes, progress: Math.round(((minutes - start) / (end - start)) * 100) };
                });
            },

            durationText(mins) {
                if (mins < 60) return `${mins} دقيقة`;
                const hours = Math.floor(mins / 60);
                const rest = mins % 60;
                return rest ? `${hours} س و${rest} د` : `${hours} ساعة`;
            },

            openSessionClass(classId) {
                const cls = this.data.classes.find(c => c.id === classId);
                if (!cls) return;
                const today = getTodayStr(0);
                const occurrence = this.occurrences(cls, today, today).find(o => !o.cancelled);
                this.openClass(classId, 'sessions');
                if (occurrence) this.openSession(occurrence.key, !this.isRecorded(cls, occurrence.key));
            },

            showSchedule() {
                this.activeClassId = null;
                this.activeQuranStudentId = null;
                document.body.classList.remove('in-class');
                document.getElementById('dashboardView').classList.add('hidden');
                document.getElementById('classWorkspaceView').classList.add('hidden');
                document.getElementById('classNavBar').classList.add('hidden');
                document.getElementById('headerBreadcrumb').classList.add('hidden');
                document.getElementById('headerAddClassBtn').classList.add('hidden');
                document.getElementById('scheduleView').classList.remove('hidden');
                this.setNavActive('schedule');
                this.renderSchedule();
                window.scrollTo({ top: 0 });
            },

            setNavActive(view) {
                document.querySelectorAll('[data-nav]').forEach(btn => {
                    const active = btn.dataset.nav === view;
                    btn.classList.toggle('text-indigo-700', active);
                    btn.classList.toggle('text-slate-500', !active);
                    if (active) btn.setAttribute('aria-current', 'page');
                    else btn.removeAttribute('aria-current');
                });
            },

            renderSchedule() {
                const box = document.getElementById('scheduleView');
                const today = new Date().getDay();
                if (this.scheduleDay === null) this.scheduleDay = today;
                const unscheduled = this.activeClasses().filter(c => this.planOf(c).type === 'weekly' && !(c.sessions || []).length);

                box.innerHTML = `
                    <div class="animate-pop space-y-4">
                        <div>
                            <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900">الجدول الأسبوعي</h1>
                            <p class="text-xs sm:text-sm text-slate-500">مواعيد الحصص والحلقات. اضغط على موعد لفتحه، ولتعديل المواعيد افتح إعدادات الحلقة.</p>
                        </div>

                        <div id="scheduleDayChips" class="flex gap-1.5 overflow-x-auto pb-1">
                            ${WEEK_DAYS.map((name, day) => `
                                <button onclick="app.scheduleDay = ${day}; app.renderSchedule();" class="shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold ${day === this.scheduleDay ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}">${name}</button>
                            `).join('')}
                        </div>

                        <div class="grid grid-cols-1 lg:grid-cols-7 gap-3">
                            ${WEEK_DAYS.map((name, day) => {
                                const sessions = this.sessionsOfDay(day);
                                return `
                                    <div class="sched-day ${day === this.scheduleDay ? 'active' : ''} bg-white/80 rounded-2xl border ${day === today ? 'border-indigo-300' : 'border-slate-200'} p-2.5 min-h-[120px]">
                                        <div class="text-xs font-extrabold ${day === today ? 'text-indigo-700' : 'text-slate-700'} mb-2 px-1">${name}${day === today ? ' • اليوم' : ''}</div>
                                        <div class="space-y-2">
                                            ${sessions.length ? sessions.map(s => {
                                                const theme = CLASS_THEMES[s.cls.theme] || CLASS_THEMES.indigo;
                                                return `
                                                    <button onclick="app.openSessionClass('${s.cls.id}')" class="w-full text-right rounded-xl p-2.5 text-white bg-gradient-to-l ${theme.bgGrad}">
                                                        <div class="text-[11px] font-bold" dir="ltr">${esc(s.start)} - ${esc(s.end)}</div>
                                                        <div class="text-xs font-extrabold truncate">${esc(s.cls.name)}</div>
                                                        <div class="text-[10px] text-white/85 truncate">${this.sessionLabel(s.cls)}${s.cls.room ? ` • ${esc(s.cls.room)}` : ''}</div>
                                                        ${this.hasConflict(s) ? '<div class="text-[10px] font-extrabold mt-0.5"><i class="fa-solid fa-triangle-exclamation"></i> تعارض في الوقت</div>' : ''}
                                                    </button>
                                                `;
                                            }).join('') : '<p class="text-[11px] text-slate-400 px-1 py-2">لا مواعيد</p>'}
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>

                        ${unscheduled.length ? `
                            <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                                <h2 class="text-sm font-extrabold text-amber-900 mb-2">حلقات بلا مواعيد</h2>
                                <div class="flex flex-wrap gap-2">
                                    ${unscheduled.map(c => `<button onclick="app.openClassModal('${c.id}')" class="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-800 text-xs font-bold">إضافة مواعيد: ${esc(c.name)}</button>`).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                `;
            },

            sessionRowsHtml() {
                const field = 'px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold';
                if (!this.sessionDraft.length) return '<p class="text-xs text-slate-500">لا توجد مواعيد بعد.</p>';
                return this.sessionDraft.map((s, i) => `
                    <div class="flex items-center gap-1.5">
                        <select aria-label="اليوم" onchange="app.updateSessionDraft(${i}, 'day', Number(this.value))" class="${field} flex-1 min-w-0">
                            ${WEEK_DAYS.map((name, day) => `<option value="${day}" ${day === s.day ? 'selected' : ''}>${name}</option>`).join('')}
                        </select>
                        <input type="time" aria-label="البداية" value="${esc(s.start)}" onchange="app.updateSessionDraft(${i}, 'start', this.value)" class="${field} w-[92px]" dir="ltr">
                        <input type="time" aria-label="النهاية" value="${esc(s.end)}" onchange="app.updateSessionDraft(${i}, 'end', this.value)" class="${field} w-[92px]" dir="ltr">
                        <button type="button" onclick="app.removeSessionDraft(${i})" title="حذف الموعد" class="w-9 h-9 rounded-xl bg-slate-100 text-rose-600 shrink-0"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                `).join('');
            },

            refreshSessionRows() {
                const box = document.getElementById('sessionRows');
                if (box) box.innerHTML = this.sessionRowsHtml();
            },

            addSessionDraft(day = null) {
                const last = this.sessionDraft[this.sessionDraft.length - 1];
                this.sessionDraft.push({
                    id: `ses_${Date.now()}_${this.sessionDraft.length}`,
                    day: day ?? (last ? (last.day + 1) % 7 : new Date().getDay()),
                    start: last?.start || '08:00',
                    end: last?.end || '08:45'
                });
                this.refreshSessionRows();
            },

            updateSessionDraft(index, key, value) {
                if (this.sessionDraft[index]) this.sessionDraft[index][key] = value;
            },

            removeSessionDraft(index) {
                this.sessionDraft.splice(index, 1);
                this.refreshSessionRows();
            },

            /* ==========================================
               THE SCHOOL BUILDING (HOME SCREEN)
               ========================================== */
            doorsPerFloor() {
                const width = document.getElementById('schoolBuilding')?.clientWidth || innerWidth;
                if (width < 440) return 2;
                if (width < 760) return 3;
                return 4;
            },

            officeHtml() {
                const now = new Date();
                const greeting = now.getHours() < 12 ? 'صباح الخير' : 'مساء الخير';
                const gregorian = `${WEEK_DAYS[now.getDay()]} ${fmtDate(dateToIso(now))}`;
                let hijri = '';
                try {
                    hijri = new Intl.DateTimeFormat('ar-u-ca-islamic-umalqura-nu-arab', { day: 'numeric', month: 'long', year: 'numeric' }).format(now);
                } catch (e) {
                    hijri = '';
                }

                const timeline = this.todayTimeline(now);
                const current = timeline.find(s => s.state === 'now');
                const next = timeline.find(s => s.state === 'next');
                const focus = current || next;
                let notice = `<div class="note-line">${timeline.length ? 'انتهت مواعيد اليوم' : 'لا مواعيد اليوم'}</div>`;
                if (focus) {
                    notice = `
                        <div class="note-line">${current ? `<span class="live-dot"></span> ${this.sessionLabel(focus.cls)} الآن، يتبقى ${this.durationText(focus.endsIn)}` : `${this.sessionLabel(focus.cls)} التالية بعد ${this.durationText(focus.startsIn)}`}</div>
                        <button onclick="app.openDoor('${focus.cls.id}', event)" class="note-link">${esc(focus.cls.name)} • <span dir="ltr">${esc(focus.start)}</span></button>
                    `;
                }

                const frames = [
                    { icon: 'fa-gear', label: 'الإعدادات', action: 'app.openSettingsModal()' },
                    { icon: 'fa-calendar-days', label: 'الجدول', action: 'app.showSchedule()' },
                    { icon: 'fa-cloud', label: 'السحابة', action: 'app.openSettingsModal()' }
                ];

                return `
                    <div class="floor floor-office">
                        <div class="office-window" aria-hidden="true">
                            <span class="sky-disc"></span><span class="sky-star s1"></span><span class="sky-star s2"></span><span class="sky-star s3"></span>
                        </div>
                        <div class="office-frames">
                            ${frames.map(f => `
                                <button onclick="${f.action}" class="wall-frame" title="${f.label}" aria-label="${f.label}">
                                    <i class="fa-solid ${f.icon}"></i>
                                </button>
                            `).join('')}
                        </div>
                        <button onclick="app.openOfficeModal()" class="office-desk" title="مكتب الإدارة" aria-label="مكتب الإدارة">
                            ${this.officeDeskSvg()}
                            <span class="office-sign">الإدارة</span>
                        </button>
                    </div>
                `;
            },

            officeDeskSvg() {
                return `
                    <svg viewBox="0 0 220 110" aria-hidden="true">
                        <rect x="84" y="20" width="44" height="62" rx="9" fill="#2f3a3c"></rect>
                        <rect x="90" y="24" width="32" height="40" rx="6" fill="#465558"></rect>
                        <rect x="102" y="82" width="8" height="14" fill="#2f3a3c"></rect>
                        <rect x="88" y="94" width="36" height="5" rx="2.500" fill="#2f3a3c"></rect>
                        <rect x="10" y="58" width="200" height="11" rx="3" fill="#a9713d"></rect>
                        <rect x="10" y="58" width="200" height="4" rx="2" fill="#c99158"></rect>
                        <rect x="20" y="69" width="9" height="36" fill="#8a5a30"></rect>
                        <rect x="191" y="69" width="9" height="36" fill="#8a5a30"></rect>
                        <rect x="150" y="69" width="50" height="24" fill="#8a5a30"></rect>
                        <rect x="154" y="73" width="42" height="7" rx="1.500" fill="#a9713d"></rect>
                        <rect x="154" y="83" width="42" height="7" rx="1.500" fill="#a9713d"></rect>
                        <rect x="30" y="36" width="42" height="24" rx="2.500" fill="#39474a"></rect>
                        <rect x="33" y="39" width="36" height="18" rx="1.500" fill="#7cc8ba"></rect>
                        <rect x="24" y="56" width="54" height="3" rx="1.500" fill="#566467"></rect>
                        <path d="M146 58c0-14 8-20 14-20s14 6 14 20z" fill="#27736a"></path>
                        <rect x="151" y="47" width="18" height="11" rx="2" fill="#c29340" opacity="0"></rect>
                    </svg>
                `;
            },

            plantSvg(variant) {
                const leaf = ['#2f8176', '#4a9a6b', '#5a8f5c'][variant % 3];
                return `
                    <svg class="door-plant" viewBox="0 0 34 54" aria-hidden="true">
                        <path d="M17 34C8 30 5 21 7 12c6 3 10 10 10 22zM17 34c9-4 12-13 10-22-6 3-10 10-10 22zM17 34c-2-10-1-20 0-30 2 10 3 20 0 30z" fill="${leaf}"></path>
                        <path d="M7 33h20l-3 20H10z" fill="#b5673b"></path>
                        <rect x="5" y="31" width="24" height="5" rx="2" fill="#c97c4d"></rect>
                    </svg>
                `;
            },

            doorHtml(cls, idx, timeline) {
                const theme = CLASS_THEMES[cls.theme] || CLASS_THEMES.indigo;
                const live = timeline.find(s => s.cls.id === cls.id && s.state === 'now');
                const today = timeline.find(s => s.cls.id === cls.id && s.state !== 'done');
                return `
                    <div class="door-slot">
                        <div class="door-unit">
                            <span class="door-lamp ${live ? 'on' : ''}" aria-hidden="true"></span>
                            <div class="door-frame">
                                <div class="door-room" aria-hidden="true"></div>
                                <div role="button" tabindex="0" id="door_${cls.id}" onclick="app.openDoor('${cls.id}', event)" class="door-leaf" aria-label="فتح ${esc(cls.name)}">
                                    <div class="door-plate bg-gradient-to-l ${theme.bgGrad}">
                                        ${cls.photo ? `<img class="plate-photo" src="${esc(cls.photo)}" alt="">` : ''}
                                        <strong>${esc(cls.name)}</strong>
                                        <span>${esc(cls.subject)}</span>
                                    </div>
                                    <span class="door-panel"></span>
                                    <span class="door-panel"></span>
                                    <span class="door-knob"></span>
                                </div>
                            </div>
                            ${this.plantSvg(idx)}
                            <button onclick="app.confirmTrashClass('${cls.id}')" class="door-trash" title="نقل الحلقة إلى سلة المهملات" aria-label="حذف ${esc(cls.name)}"><span class="mac-trash" aria-hidden="true"></span></button>
                            ${live ? '<span class="door-badge now">الآن</span>' : (today ? `<span class="door-badge" dir="ltr">${esc(today.start)}</span>` : '')}
                            ${this.editBuilding ? `
                                <div class="door-tools">
                                    <button onclick="app.openClassModal('${cls.id}')" title="إعدادات الحلقة"><i class="fa-solid fa-pen"></i></button>
                                    <button onclick="app.duplicateClass('${cls.id}')" title="نسخ الحلقة"><i class="fa-solid fa-copy"></i></button>
                                    <button onclick="app.archiveClass('${cls.id}')" title="أرشفة الحلقة"><i class="fa-solid fa-box-archive"></i></button>
                                    <button onclick="app.confirmTrashClass('${cls.id}')" title="حذف الحلقة"><i class="fa-solid fa-trash"></i></button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            },

            renderHomeHero() {
                const box = document.getElementById('schoolBuilding');
                if (!box) return;
                const classes = this.activeClasses();
                const archivedCount = this.data.classes.filter(c => c.archived && !c.deletedAt).length;
                const trashCount = this.data.classes.filter(c => c.deletedAt).length;
                const timeline = this.todayTimeline();
                const perFloor = this.doorsPerFloor();
                const doors = classes.map((cls, i) => this.doorHtml(cls, i, timeline));
                doors.push(`
                    <div class="door-slot">
                        <button onclick="app.openClassModal()" class="door-new">
                            <i class="fa-solid fa-plus"></i><span>حلقة جديدة</span>
                        </button>
                    </div>
                `);

                const floors = [];
                for (let i = 0; i < doors.length; i += perFloor) floors.push(doors.slice(i, i + perFloor));
                while (floors.length < 2) floors.push([]);

                box.innerHTML = `
                    <div class="school">
                        <div class="school-roof">
                            <span>مركز التحفيظ</span>
                            <button onclick="app.toggleBuildingEdit()" class="roof-btn">${this.editBuilding ? 'تم' : 'تعديل'}</button>
                            <div class="roof-end">
                                ${archivedCount ? `<button onclick="app.openArchiveModal()" class="roof-btn" title="أرشيف الحلقات"><i class="fa-solid fa-box-archive"></i> ${archivedCount}</button>` : ''}
                                <button onclick="app.openTrashModal()" class="roof-btn" title="سلة المهملات" aria-label="سلة المهملات"><span class="mac-trash" aria-hidden="true"></span> ${trashCount || ''}</button>
                            </div>
                        </div>
                        ${this.officeHtml()}
                        ${floors.map((list, i) => `
                            <div class="floor" aria-label="الطابق ${i + 1}">
                                <div class="floor-doors" style="grid-template-columns: repeat(${perFloor}, minmax(0, 1fr))">${list.join('')}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
                this.renderedFloorSize = perFloor;
            },

            toggleBuildingEdit() {
                this.editBuilding = !this.editBuilding;
                this.renderHomeHero();
            },

            /** The door swings open before the classroom appears. */
            openDoor(classId, event) {
                sfx.play('click');
                const door = document.getElementById(`door_${classId}`);
                const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (!door || reduced || document.visibilityState !== 'visible') {
                    this.openClass(classId, 'seating');
                    return;
                }
                door.classList.add('open');
                setTimeout(() => this.openClass(classId, 'seating'), 420);
            },

            openOfficeModal() {
                const classes = this.data.classes;
                const students = classes.reduce((sum, c) => sum + c.students.length, 0);
                const rates = classes.map(c => this.getClassAttendanceRate(c)).filter(r => r !== null);
                const average = rates.length ? Math.round(rates.reduce((a, b) => a + b, 0) / rates.length) : null;
                const logs = classes.reduce((sum, c) => sum + (c.behaviorLogs || []).length, 0);
                const tiles = [
                    ['الحلقات', classes.length, 'fa-door-open'],
                    ['الطلاب', students, 'fa-user-graduate'],
                    ['متوسط الحضور', fmtPct(average), 'fa-calendar-check'],
                    ['سجلات السلوك', logs, 'fa-medal']
                ];
                this.openModal('مكتب الإدارة', `
                    <div class="grid grid-cols-2 gap-3">
                        ${tiles.map(([label, value, icon]) => `
                            <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                                <i class="fa-solid ${icon} text-indigo-600"></i>
                                <div class="text-2xl font-extrabold text-slate-900 mt-1">${value}</div>
                                <div class="text-xs font-bold text-slate-500">${label}</div>
                            </div>
                        `).join('')}
                    </div>
                `);
            },

            /* ==========================================
               INSIDE THE CLASSROOM: DESKS ON THE FLOOR
               ========================================== */
            photoHtml(st) {
                if (st.photo) return `<img src="${esc(st.photo)}" alt="">`;
                return `
                    <svg viewBox="0 0 60 60" aria-hidden="true">
                        <rect width="60" height="60" fill="#dfe3e0"></rect>
                        <circle cx="30" cy="24" r="12" fill="#9aa5a1"></circle>
                        <path d="M9 60c0-14 9-21 21-21s21 7 21 21z" fill="#9aa5a1"></path>
                    </svg>
                `;
            },

            seatPlan(cls) {
                const occupied = {};
                cls.students.forEach(st => {
                    if (st.seatIndex === undefined || occupied[st.seatIndex]) st.seatIndex = this.nextFreeSeat(cls);
                    occupied[st.seatIndex] = st;
                });
                const highest = cls.students.reduce((max, st) => Math.max(max, st.seatIndex), -1);
                const rows = Math.max(3, Math.ceil(Math.max(cls.students.length, highest + 1) / DESKS_PER_ROW));
                return { occupied, total: rows * DESKS_PER_ROW };
            },

            shortName(name) {
                const parts = name.trim().split(/\s+/);
                return parts.length > 2 ? `${parts[0]} ${parts[parts.length - 1]}` : name;
            },

            deskHtml(cls, st, options = {}) {
                const att = this.getStudentAttendanceStats(cls, st.id);
                const beh = this.getStudentBehaviorStats(cls, st.id);
                const behaviorLevel = Math.max(8, Math.min(100, 50 + beh.net * 6));
                return `
                    <div class="desk-cell ${options.selected ? 'selected' : ''}" data-seat="${st.seatIndex}" data-student="${st.id}"
                        role="button" tabindex="0" onclick="${options.action}" aria-label="${esc(st.name)}${options.ribbonText ? `: ${options.ribbonText}` : ''}">
                        <div class="desk">
                            <div class="desk-name">${esc(this.shortName(st.name))}</div>
                            <div class="desk-top">
                                <div class="desk-photo">${this.photoHtml(st)}</div>
                                ${options.ribbonText ? '' : `
                                    <div class="desk-bars" aria-hidden="true">
                                        <span class="bar" title="الحضور"><i class="good" style="height: ${att.rate ?? 0}%"></i></span>
                                        <span class="bar" title="السلوك"><i class="${beh.net >= 0 ? 'good' : 'warn'}" style="height: ${behaviorLevel}%"></i></span>
                                    </div>
                                `}
                            </div>
                        </div>
                        ${options.ribbonText
                            ? `<div class="desk-ribbon ${options.ribbonClass || ''}" ${options.ribbonColor ? `style="background:${options.ribbonColor}"` : ''}>${esc(options.ribbonText)}</div>`
                            : '<div class="desk-stool" aria-hidden="true"></div>'}
                        ${options.badge ? `<span class="desk-badge">${esc(options.badge)}</span>` : ''}
                    </div>
                `;
            },

            floorHtml(cls, makeDesk, emptyAction = null) {
                const { occupied, total } = this.seatPlan(cls);
                if (!cls.students.length) {
                    return `
                        <div class="class-floor empty-floor">
                            <i class="fa-solid fa-chair"></i>
                            <p>الحلقة فارغة، أضف طلابك ليجلسوا هنا</p>
                            <button onclick="app.openBulkStudentsModal()" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">إضافة الطلاب</button>
                        </div>
                    `;
                }
                return `
                    <div class="class-floor ${emptyAction ? 'rearranging' : ''}">
                        <div class="desk-grid">
                            ${Array.from({ length: total }, (_, seat) => {
                                const st = occupied[seat];
                                if (st) return makeDesk(st);
                                return emptyAction
                                    ? `<div class="desk-empty" data-seat="${seat}" role="button" tabindex="0" onclick="${emptyAction(seat)}" aria-label="مقعد فارغ ${seat + 1}"><i class="fa-solid fa-plus"></i></div>`
                                    : '<div class="desk-gap" aria-hidden="true"></div>';
                            }).join('')}
                        </div>
                    </div>
                `;
            },

            classToolbar(buttons) {
                return `<div class="class-toolbar no-print">${buttons}</div>`;
            },

            renderSeatingTab(cls, container) {
                const rearranging = this.rearrangeMode;
                const source = this.selectedSwapStudentId;
                const makeDesk = st => this.deskHtml(cls, st, {
                    selected: source === st.id,
                    action: rearranging ? `app.pickSeat('${st.id}')` : `app.openStudentProfileModal('${st.id}')`
                });

                container.innerHTML = `
                    <div class="animate-pop">
                        ${this.classToolbar(`
                            <button onclick="app.toggleRearrange()" class="tool-btn ${rearranging ? 'active' : ''}"><i class="fa-solid fa-up-down-left-right"></i><span>${rearranging ? 'تم' : 'ترتيب المقاعد'}</span></button>
                            ${rearranging ? `
                                <button onclick="app.randomizeSeating()" class="tool-btn"><i class="fa-solid fa-shuffle"></i><span>عشوائي</span></button>
                                <button onclick="app.resetSeatingOrder()" class="tool-btn"><i class="fa-solid fa-arrow-down-a-z"></i><span>أبجدي</span></button>
                            ` : `
                                <button onclick="app.openMessageMenu()" class="tool-btn"><i class="fa-solid fa-envelope"></i><span>مراسلة</span></button>
                            `}
                        `)}
                        ${rearranging ? '<p class="floor-hint no-print">اسحب المقعد إلى مكان آخر، أو اضغط طالبًا ثم اضغط المكان الجديد</p>' : ''}
                        ${this.floorHtml(cls, makeDesk, rearranging ? seat => `app.moveStudentToDesk(${seat})` : null)}
                    </div>
                `;
                if (rearranging) this.bindSeatDrag(container);
            },

            toggleRearrange() {
                this.rearrangeMode = !this.rearrangeMode;
                this.selectedSwapStudentId = null;
                this.renderClassWorkspace();
            },

            pickSeat(studentId) {
                if (this.selectedSwapStudentId && this.selectedSwapStudentId !== studentId) {
                    const target = this.getActiveClass().students.find(s => s.id === studentId);
                    this.moveStudentToDesk(target.seatIndex);
                    return;
                }
                this.startSeatSwap(studentId);
            },

            /** Dragging works with mouse and touch through pointer events. */
            bindSeatDrag(container) {
                const floor = container.querySelector('.class-floor');
                if (!floor) return;
                let drag = null;
                floor.addEventListener('pointerdown', event => {
                    const cell = event.target.closest('.desk-cell');
                    if (!cell) return;
                    drag = { cell, id: cell.dataset.student, x: event.clientX, y: event.clientY, moved: false };
                    cell.setPointerCapture(event.pointerId);
                });
                floor.addEventListener('pointermove', event => {
                    if (!drag) return;
                    const dx = event.clientX - drag.x;
                    const dy = event.clientY - drag.y;
                    if (!drag.moved && Math.hypot(dx, dy) < 8) return;
                    drag.moved = true;
                    drag.cell.classList.add('dragging');
                    drag.cell.style.transform = `translate(${dx}px, ${dy}px) scale(1.06)`;
                });
                const finish = event => {
                    if (!drag) return;
                    const { cell, id, moved } = drag;
                    drag = null;
                    if (!moved) return;
                    cell.style.visibility = 'hidden';
                    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-seat]');
                    cell.style.visibility = '';
                    cell.style.transform = '';
                    cell.classList.remove('dragging');
                    this.suppressSeatClick = true;
                    setTimeout(() => { this.suppressSeatClick = false; }, 50);
                    if (target && Number(target.dataset.seat) !== Number(cell.dataset.seat)) {
                        this.selectedSwapStudentId = id;
                        this.moveStudentToDesk(Number(target.dataset.seat));
                    }
                };
                floor.addEventListener('pointerup', finish);
                floor.addEventListener('pointercancel', finish);
                floor.addEventListener('click', event => {
                    if (this.suppressSeatClick) {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                }, true);
            },

            renderAttendanceTab(cls, container) {
                if (!cls.attendance) cls.attendance = {};
                const key = this.attendanceKey();
                const day = cls.attendance[key] || {};
                const types = this.attendanceTypes();
                const counts = Object.fromEntries(types.map(t => [t.id, 0]));
                let unmarked = 0;
                cls.students.forEach(st => {
                    if (day[st.id] in counts) counts[day[st.id]]++;
                    else unmarked++;
                });
                const lessons = Math.max(this.selectedLesson, ...Object.keys(cls.attendance)
                    .filter(k => k.startsWith(this.selectedDate))
                    .map(k => Number(k.split('~')[1] || 1)));

                const makeDesk = st => {
                    const type = this.attendanceType(day[st.id]);
                    const absences = this.getStudentAttendanceStats(cls, st.id).absent;
                    return this.deskHtml(cls, st, {
                        action: `app.CycleStudentAttendance('${st.id}')`,
                        ribbonText: type?.label || 'لم يُرصد',
                        ribbonClass: type ? '' : 'none',
                        ribbonColor: type?.color,
                        badge: type?.countsAs === 'absent' && absences ? String(absences) : ''
                    });
                };

                container.innerHTML = `
                    <div class="animate-pop">
                        ${this.classToolbar(`
                            <button onclick="app.shiftAttendanceDate(1)" class="tool-btn" title="اليوم التالي" aria-label="اليوم التالي"><i class="fa-solid fa-chevron-right"></i></button>
                            <span class="tool-date">${this.dateInputHtml('attDateInput', this.selectedDate, 'aria-label="تاريخ الحصة" onchange="app.onAttendanceDateText(this.value)"')}</span>
                            <button onclick="app.shiftAttendanceDate(-1)" class="tool-btn" title="اليوم السابق" aria-label="اليوم السابق"><i class="fa-solid fa-chevron-left"></i></button>
                            <select aria-label="الحصة" onchange="app.selectedLesson = Number(this.value); app.renderClassWorkspace();" class="tool-btn">
                                ${Array.from({ length: lessons + 1 }, (_, i) => i + 1).map(n => `<option value="${n}" ${n === this.selectedLesson ? 'selected' : ''}>${n > lessons ? '+ حصة أخرى' : `الحصة ${n}`}</option>`).join('')}
                            </select>
                            <button onclick="app.selectedDate = '${getTodayStr(0)}'; app.selectedLesson = 1; app.renderClassWorkspace();" class="tool-btn"><span>اليوم</span></button>
                            <button onclick="app.markAllAttendance('${types[0].id}')" class="tool-btn active"><i class="fa-solid fa-check-double"></i><span>${esc(types[0].label)} للجميع</span></button>
                            <button onclick="app.clearDayAttendance()" class="tool-btn"><i class="fa-solid fa-rotate-left"></i><span>مسح</span></button>
                        `)}
                        <div class="att-counts no-print">
                            ${types.map(t => `<span style="background:${t.color}">${esc(t.label)} ${counts[t.id]}</span>`).join('')}
                            <span class="none">لم يُرصد ${unmarked}</span>
                        </div>
                        <p class="floor-hint no-print">اضغط على الطالب لتغيير حالته: ${types.map(t => esc(t.label)).join('، ')}</p>
                        ${this.floorHtml(cls, makeDesk)}
                    </div>
                `;
            },

            renderBehaviorTab(cls, container) {
                const selecting = this.behaviorSelectMode;
                const picked = this.selectedBehaviorStudentIds;
                const logs = [...(cls.behaviorLogs || [])].reverse().slice(0, 20);
                const nameOf = id => cls.students.find(s => s.id === id)?.name
                    || (cls.archivedStudents || []).find(s => s.id === id)?.name || 'طالب محذوف';

                const makeDesk = st => {
                    const stats = this.getStudentBehaviorStats(cls, st.id);
                    return this.deskHtml(cls, st, {
                        selected: picked.includes(st.id),
                        action: selecting ? `app.toggleBehaviorStudentSelection('${st.id}')` : `app.openGiveBehaviorModal(['${st.id}'])`,
                        ribbonText: stats.net > 0 ? `+${stats.net}` : String(stats.net),
                        ribbonClass: stats.net > 0 ? 'present' : (stats.net < 0 ? 'absent' : 'none')
                    });
                };

                container.innerHTML = `
                    <div class="animate-pop">
                        ${this.classToolbar(`
                            <button onclick="app.toggleBehaviorSelect()" class="tool-btn ${selecting ? 'active' : ''}"><i class="fa-solid fa-users"></i><span>${selecting ? 'إلغاء الاختيار' : 'تقييم مجموعة'}</span></button>
                            ${selecting ? `
                                <button onclick="app.toggleSelectAllBehaviorStudents()" class="tool-btn"><span>تحديد الكل</span></button>
                                <button onclick="app.openGiveBehaviorModal(app.selectedBehaviorStudentIds)" class="tool-btn active" ${picked.length ? '' : 'disabled'}><span>تقييم ${picked.length} طلاب</span></button>
                            ` : ''}
                        `)}
                        <p class="floor-hint no-print">اضغط على الطالب لإضافة تقييم إيجابي أو سلبي مع ملاحظة</p>
                        ${this.floorHtml(cls, makeDesk)}
                        <div class="mt-4 bg-white rounded-2xl border border-slate-200 p-4">
                            <h3 class="font-extrabold text-slate-900 text-sm mb-2">آخر التقييمات</h3>
                            ${logs.length ? `
                                <div class="space-y-2">
                                    ${logs.map(log => `
                                        <div class="flex items-center justify-between gap-2 text-xs bg-slate-50 rounded-xl p-2.5">
                                            <div class="min-w-0">
                                                <div class="font-bold text-slate-800 truncate">${esc(nameOf(log.studentId))}: <span class="${log.points > 0 ? 'text-emerald-700' : 'text-rose-600'}">${esc(log.label)} (${log.points > 0 ? '+' : ''}${log.points})</span></div>
                                                <div class="text-[11px] text-slate-500">${fmtDate(log.date)}${log.note ? ` • ${esc(log.note)}` : ''}</div>
                                            </div>
                                            <button onclick="app.deleteBehaviorLog('${log.id}')" title="حذف السجل" class="text-slate-400 hover:text-rose-600 p-1 shrink-0"><i class="fa-solid fa-trash-can"></i></button>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : '<p class="text-xs text-slate-500">لا توجد تقييمات بعد</p>'}
                        </div>
                    </div>
                `;
            },

            toggleBehaviorSelect() {
                this.behaviorSelectMode = !this.behaviorSelectMode;
                this.selectedBehaviorStudentIds = [];
                this.renderClassWorkspace();
            },

            /** Photos are reduced to a small square so hundreds fit in browser storage. */
            onStudentPhotoChosen(event) {
                const file = event.target.files?.[0];
                event.target.value = '';
                if (!file) return;
                const fail = () => this.showToast('تعذر قراءة الصورة', 'error');
                const reader = new FileReader();
                reader.onerror = fail;
                reader.onload = () => {
                    const image = new Image();
                    image.onerror = fail;
                    image.onload = () => {
                        const size = 120;
                        const side = Math.min(image.width, image.height);
                        const canvas = document.createElement('canvas');
                        canvas.width = size;
                        canvas.height = size;
                        canvas.getContext('2d').drawImage(image, (image.width - side) / 2, (image.height - side) / 2, side, side, 0, 0, size, size);
                        this.studentPhotoDraft = canvas.toDataURL('image/jpeg', 0.72);
                        this.refreshPhotoPreview();
                    };
                    image.src = reader.result;
                };
                reader.readAsDataURL(file);
            },

            refreshPhotoPreview() {
                const box = document.getElementById('stuPhotoPreview');
                if (box) box.innerHTML = this.photoHtml({ photo: this.studentPhotoDraft });
            },

            removeStudentPhoto() {
                this.studentPhotoDraft = '';
                this.refreshPhotoPreview();
            },

            /* ==========================================
               SETTINGS THE TEACHER CAN CUSTOMIZE
               ========================================== */
            settings() {
                if (!this.data.settings) this.data.settings = cleanSettings({});
                return this.data.settings;
            },

            attendanceTypes() {
                return this.settings().attendanceTypes;
            },

            attendanceType(id) {
                return this.attendanceTypes().find(t => t.id === id) || null;
            },

            /** What a status means for the attendance rate: present, absent, late or excused. */
            attendanceMeaning(status) {
                return this.attendanceType(status)?.countsAs || null;
            },

            behaviorTypes() {
                return this.settings().behaviorTypes;
            },

            gradeLevelFor(pct) {
                const levels = [...this.settings().gradeLevels].sort((a, b) => b.min - a.min);
                const index = levels.findIndex(l => pct >= l.min);
                const level = levels[index === -1 ? levels.length - 1 : index];
                const tones = ['bg-emerald-100 text-emerald-700', 'bg-indigo-100 text-indigo-700', 'bg-sky-100 text-sky-700', 'bg-amber-100 text-amber-800', 'bg-rose-100 text-rose-700'];
                const position = levels.length > 1 ? Math.round((Math.max(index, 0) / (levels.length - 1)) * (tones.length - 1)) : 0;
                return { label: level?.label || '', badgeClass: tones[position] };
            },

            attendanceKey() {
                return this.selectedLesson > 1 ? `${this.selectedDate}~${this.selectedLesson}` : this.selectedDate;
            },

            shiftAttendanceDate(days) {
                const [y, m, d] = this.selectedDate.split('-').map(Number);
                const date = new Date(y, m - 1, d + days);
                this.selectedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                this.renderClassWorkspace();
            },

            editorRow(content) {
                return `<div class="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2">${content}</div>`;
            },

            openCustomizeModal(kind) {
                const field = 'px-2 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold';
                const removeBtn = index => `<button type="button" onclick="app.removeCustomRow('${kind}', ${index})" title="حذف" class="w-9 h-9 rounded-lg bg-white border border-slate-200 text-rose-600 shrink-0"><i class="fa-solid fa-xmark"></i></button>`;
                const s = this.settings();
                const config = {
                    attendance: {
                        title: 'أنواع الحضور',
                        hint: 'لكل نوع اسم ولون، ويُحتسب في النسبة كحاضر أو غائب أو متأخر أو مستأذن.',
                        rows: s.attendanceTypes.map((t, i) => this.editorRow(`
                            <input type="color" aria-label="اللون" value="${esc(t.color)}" onchange="app.updateCustomRow('attendance', ${i}, 'color', this.value)" class="w-9 h-9 rounded-lg border border-slate-200 shrink-0">
                            <input type="text" aria-label="الاسم" value="${esc(t.label)}" onchange="app.updateCustomRow('attendance', ${i}, 'label', this.value)" class="${field} flex-1 min-w-0">
                            <select aria-label="يُحتسب" onchange="app.updateCustomRow('attendance', ${i}, 'countsAs', this.value)" class="${field}">
                                ${[['present', 'حاضر'], ['absent', 'غائب'], ['late', 'متأخر'], ['excused', 'مستأذن']].map(([v, l]) => `<option value="${v}" ${t.countsAs === v ? 'selected' : ''}>${l}</option>`).join('')}
                            </select>
                            ${removeBtn(i)}
                        `))
                    },
                    behavior: {
                        title: 'أنواع السلوك',
                        hint: 'السلوك الإيجابي بنقاط موجبة، والسلبي بنقاط سالبة.',
                        rows: s.behaviorTypes.map((t, i) => this.editorRow(`
                            <select aria-label="الأيقونة" onchange="app.updateCustomRow('behavior', ${i}, 'icon', this.value)" class="${field} w-16">
                                ${BEHAVIOR_ICONS.map(ic => `<option value="${ic}" ${t.icon === ic ? 'selected' : ''}>${BEHAVIOR_ICON_NAMES[ic] || ic}</option>`).join('')}
                            </select>
                            <input type="text" aria-label="الاسم" value="${esc(t.label)}" onchange="app.updateCustomRow('behavior', ${i}, 'label', this.value)" class="${field} flex-1 min-w-0">
                            <input type="number" aria-label="النقاط" value="${t.points}" min="-10" max="10" onchange="app.updateCustomRow('behavior', ${i}, 'points', this.value)" class="${field} w-16 text-center">
                            ${removeBtn(i)}
                        `))
                    },
                    levels: {
                        title: 'مستويات التقدير',
                        hint: 'التقدير الذي يأخذه الطالب حين تبلغ نسبته الحد الأدنى أو أكثر، مثل ممتاز أو A.',
                        rows: s.gradeLevels.map((l, i) => this.editorRow(`
                            <input type="text" aria-label="التقدير" value="${esc(l.label)}" onchange="app.updateCustomRow('levels', ${i}, 'label', this.value)" class="${field} flex-1 min-w-0">
                            <span class="text-xs font-bold text-slate-500 shrink-0">من</span>
                            <input type="number" aria-label="الحد الأدنى" value="${l.min}" min="0" max="100" onchange="app.updateCustomRow('levels', ${i}, 'min', this.value)" class="${field} w-20 text-center">
                            <span class="text-xs font-bold text-slate-500">%</span>
                            ${removeBtn(i)}
                        `))
                    },
                    fields: {
                        title: 'حقول الطالب المخصصة',
                        hint: 'حقول إضافية تظهر في بطاقة كل طالب، مثل فصيلة الدم أو رقم الحافلة.',
                        rows: s.studentFields.map((f, i) => this.editorRow(`
                            <input type="text" aria-label="اسم الحقل" value="${esc(f.label)}" onchange="app.updateCustomRow('fields', ${i}, 'label', this.value)" class="${field} flex-1 min-w-0">
                            ${removeBtn(i)}
                        `))
                    }
                }[kind];

                this.customizeKind = kind;
                this.openModal(config.title, `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-500">${config.hint}</p>
                        <div class="space-y-2">${config.rows.join('') || '<p class="text-xs text-slate-500">لا توجد عناصر.</p>'}</div>
                        <div class="flex justify-between gap-2 pt-2">
                            <button onclick="app.addCustomRow('${kind}')" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">+ إضافة</button>
                            <button onclick="app.openSettingsModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">رجوع</button>
                        </div>
                    </div>
                `);
            },

            customList(kind) {
                const s = this.settings();
                return { attendance: s.attendanceTypes, behavior: s.behaviorTypes, levels: s.gradeLevels, fields: s.studentFields }[kind];
            },

            updateCustomRow(kind, index, key, value) {
                const row = this.customList(kind)[index];
                if (!row) return;
                row[key] = ['points', 'min'].includes(key) ? Number(value) || 0 : value;
                if (kind === 'behavior' && key === 'points') row.type = row.points < 0 ? 'negative' : 'positive';
                this.data.settings = cleanSettings(this.data.settings);
                this.saveData();
            },

            addCustomRow(kind) {
                const id = `${kind.slice(0, 3)}_${Date.now()}`;
                const row = {
                    attendance: { id, label: 'نوع جديد', color: '#7a5c7e', countsAs: 'present' },
                    behavior: { id, label: 'سلوك جديد', points: 1, type: 'positive', icon: 'fa-star' },
                    levels: { label: 'تقدير جديد', min: 50 },
                    fields: { id, label: 'حقل جديد' }
                }[kind];
                this.customList(kind).push(row);
                this.saveData();
                this.openCustomizeModal(kind);
            },

            removeCustomRow(kind, index) {
                const list = this.customList(kind);
                if (list.length <= 1 && kind !== 'fields') {
                    this.showToast('يجب أن يبقى عنصر واحد على الأقل', 'error');
                    return;
                }
                list.splice(index, 1);
                this.saveData();
                this.openCustomizeModal(kind);
            },

            /* ==========================================
               PASSCODE LOCK
               ========================================== */
            async hashPasscode(code) {
                const text = `moallemkit:${code}`;
                if (crypto?.subtle) {
                    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
                    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
                }
                // Fallback for browsers without Web Crypto on local files.
                let hash = 2166136261;
                for (const ch of text) hash = Math.imul(hash ^ ch.charCodeAt(0), 16777619);
                return `fnv${(hash >>> 0).toString(16)}`;
            },

            openPasscodeModal() {
                const hasCode = Boolean(this.settings().passcodeHash);
                this.openModal('رمز الدخول', `
                    <form onsubmit="event.preventDefault(); app.savePasscode();" class="space-y-3">
                        <p class="text-xs text-slate-500">يُطلب الرمز عند فتح التطبيق. يمنع الاطلاع العابر على الجهاز، لكنه لا يشفّر البيانات.</p>
                        ${hasCode ? '<input type="password" inputmode="numeric" id="pinOld" required placeholder="الرمز الحالي" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-center tracking-widest">' : ''}
                        <input type="password" inputmode="numeric" id="pinNew" pattern="[0-9]{4,8}" placeholder="${hasCode ? 'الرمز الجديد (اتركه فارغًا للإلغاء)' : 'رمز من 4 إلى 8 أرقام'}" ${hasCode ? '' : 'required'} class="w-full px-3 py-2 border border-slate-300 rounded-xl text-center tracking-widest">
                        <input type="password" inputmode="numeric" id="pinRepeat" placeholder="أعد كتابة الرمز" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-center tracking-widest">
                        <div class="flex justify-end gap-2">
                            <button type="button" onclick="app.openSettingsModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">رجوع</button>
                            <button type="submit" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">حفظ</button>
                        </div>
                    </form>
                `);
            },

            async savePasscode() {
                const s = this.settings();
                const value = id => document.getElementById(id)?.value.trim() || '';
                if (s.passcodeHash && await this.hashPasscode(value('pinOld')) !== s.passcodeHash) {
                    this.showToast('الرمز الحالي غير صحيح', 'error');
                    return;
                }
                const next = value('pinNew');
                if (next && !/^\d{4,8}$/.test(next)) {
                    this.showToast('الرمز من 4 إلى 8 أرقام', 'error');
                    return;
                }
                if (next !== value('pinRepeat')) {
                    this.showToast('الرمزان غير متطابقين', 'error');
                    return;
                }
                s.passcodeHash = next ? await this.hashPasscode(next) : '';
                this.saveData();
                this.showToast(next ? 'تم تفعيل رمز الدخول' : 'تم إلغاء رمز الدخول');
                this.openSettingsModal();
            },

            showLockScreen() {
                if (!this.settings().passcodeHash || document.getElementById('lockScreen')) return;
                document.body.insertAdjacentHTML('beforeend', `
                    <div id="lockScreen" class="lock-screen" role="dialog" aria-modal="true" aria-label="أدخل رمز الدخول">
                        <form onsubmit="event.preventDefault(); app.unlock();" class="lock-card">
                            <i class="fa-solid fa-lock text-2xl text-indigo-600"></i>
                            <h2 class="text-lg font-extrabold text-slate-900">أدخل رمز الدخول</h2>
                            <input id="lockInput" type="password" inputmode="numeric" autocomplete="off" aria-label="رمز الدخول" class="w-full px-3 py-3 border border-slate-300 rounded-xl text-center text-xl tracking-[0.5em]">
                            <button type="submit" class="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold">فتح</button>
                            <p id="lockError" class="text-xs font-bold text-rose-600 min-h-[1rem]"></p>
                        </form>
                    </div>
                `);
                setTimeout(() => document.getElementById('lockInput')?.focus(), 50);
            },

            async unlock() {
                const input = document.getElementById('lockInput');
                if (await this.hashPasscode(input.value.trim()) === this.settings().passcodeHash) {
                    document.getElementById('lockScreen')?.remove();
                    return;
                }
                input.value = '';
                document.getElementById('lockError').textContent = 'الرمز غير صحيح';
            },

            /* ==========================================
               CLASSES: PHOTO, ARCHIVE, COPY
               ========================================== */
            activeClasses() {
                return this.data.classes.filter(c => !c.archived && !c.deletedAt);
            },

            onClassPhotoChosen(event) {
                this.readPhoto(event, url => {
                    this.classPhotoDraft = url;
                    const box = document.getElementById('clsPhotoPreview');
                    if (box) box.innerHTML = url ? `<img src="${esc(url)}" alt="">` : '<i class="fa-regular fa-image text-xl text-slate-400"></i>';
                });
            },

            /** Shared by student and class photos: a small square JPEG kept inside the data. */
            readPhoto(event, done) {
                const file = event.target.files?.[0];
                event.target.value = '';
                if (!file) return;
                const fail = () => this.showToast('تعذر قراءة الصورة', 'error');
                const reader = new FileReader();
                reader.onerror = fail;
                reader.onload = () => {
                    const image = new Image();
                    image.onerror = fail;
                    image.onload = () => {
                        const size = 120;
                        const side = Math.min(image.width, image.height);
                        const canvas = document.createElement('canvas');
                        canvas.width = size;
                        canvas.height = size;
                        canvas.getContext('2d').drawImage(image, (image.width - side) / 2, (image.height - side) / 2, side, side, 0, 0, size, size);
                        done(canvas.toDataURL('image/jpeg', 0.72));
                    };
                    image.src = reader.result;
                };
                reader.readAsDataURL(file);
            },

            archiveClass(classId, archived = true) {
                const cls = this.data.classes.find(c => c.id === classId);
                if (!cls) return;
                cls.archived = archived;
                this.saveData();
                this.closeModal();
                this.showDashboard();
                this.showToast(archived ? 'نُقلت الحلقة إلى الأرشيف' : 'أُعيدت الحلقة من الأرشيف');
            },

            duplicateClass(classId) {
                const source = this.data.classes.find(c => c.id === classId);
                if (!source) return;
                const stamp = Date.now();
                const copy = JSON.parse(JSON.stringify(source));
                Object.assign(copy, {
                    id: `cls_${stamp}`,
                    name: `نسخة من ${source.name}`,
                    archived: false,
                    attendance: {},
                    behaviorLogs: [],
                    grades: {},
                    quranRecords: {},
                    archivedStudents: [],
                    sessions: (source.sessions || []).map((s, i) => ({ ...s, id: `ses_${stamp}_${i}` })),
                    students: source.students.map((st, i) => ({ ...st, id: `stu_${stamp}_${i}` }))
                });
                this.data.classes.push(copy);
                this.saveData();
                this.renderDashboard();
                this.showToast('تم نسخ الحلقة بطلابه وإعداداته، دون السجلات');
            },

            openArchiveModal() {
                const archived = this.data.classes.filter(c => c.archived && !c.deletedAt);
                this.openModal('أرشيف الحلقات', archived.length ? `
                    <div class="space-y-2">
                        ${archived.map(c => `
                            <div class="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                                <span class="text-sm font-bold text-slate-800 truncate">${esc(c.name)}</span>
                                <div class="flex gap-2 shrink-0">
                                    <button onclick="app.archiveClass('${c.id}', false)" class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold">إعادة</button>
                                    <button onclick="app.confirmDeleteClass('${c.id}')" class="px-3 py-1.5 rounded-lg bg-white border border-rose-300 text-rose-700 text-xs font-bold">حذف</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p class="text-sm text-slate-500">لا توجد حلقات مؤرشفة.</p>');
            },

            /* ==========================================
               STUDENTS: FULL RECORD, IMPORT, MESSAGES
               ========================================== */
            studentDetailsHtml(st) {
                const rows = [
                    ['رقم الطالب', st.studentNumber], ['الجنس', st.gender], ['تاريخ الميلاد', st.birthDate],
                    ['البريد', st.email], ['الجوال', st.phone], ['ولي الأمر', st.parentName],
                    ['جوال ولي الأمر', st.guardianPhone], ['بريد ولي الأمر', st.parentEmail], ['العنوان', st.address],
                    ...this.settings().studentFields.map(f => [f.label, st.custom?.[f.id]])
                ].filter(([, v]) => v);
                if (!rows.length) return '';
                return `
                    <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4">
                        ${rows.map(([k, v]) => `<span class="text-slate-500">${esc(k)}</span><span class="font-bold text-slate-800 truncate">${esc(v)}</span>`).join('')}
                    </div>
                `;
            },

            studentFieldsFormHtml(st) {
                const field = 'w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm';
                const input = (id, label, value, type = 'text', extra = '') => `
                    <div>
                        <label for="${id}" class="block text-xs font-bold text-slate-700 mb-1">${label}</label>
                        <input type="${type}" id="${id}" value="${esc(value || '')}" ${extra} class="${field}">
                    </div>
                `;
                return `
                    <details class="bg-white border border-slate-200 rounded-xl p-3" ${st && (st.email || st.parentName) ? 'open' : ''}>
                        <summary class="text-xs font-extrabold text-slate-700 cursor-pointer">بيانات إضافية وأولياء الأمور</summary>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                            ${input('stuNumberInput', 'رقم الطالب', st?.studentNumber)}
                            <div>
                                <label for="stuGenderInput" class="block text-xs font-bold text-slate-700 mb-1">الجنس</label>
                                <select id="stuGenderInput" class="${field}">
                                    ${['', 'ذكر', 'أنثى'].map(g => `<option value="${g}" ${st?.gender === g ? 'selected' : ''}>${g || '—'}</option>`).join('')}
                                </select>
                            </div>
                            <div><label class="block text-xs font-bold text-slate-700 mb-1">تاريخ الميلاد</label>${this.dateInputHtml('stuBirthInput', st?.birthDate)}</div>
                            ${input('stuEmailInput', 'بريد الطالب', st?.email, 'email', 'dir="ltr"')}
                            ${input('stuOwnPhoneInput', 'جوال الطالب', st?.phone, 'tel', 'dir="ltr"')}
                            ${input('stuParentInput', 'اسم ولي الأمر', st?.parentName)}
                            ${input('stuParentEmailInput', 'بريد ولي الأمر', st?.parentEmail, 'email', 'dir="ltr"')}
                            ${input('stuAddressInput', 'العنوان', st?.address)}
                            ${this.settings().studentFields.map(f => input(`stuCustom_${f.id}`, esc(f.label), st?.custom?.[f.id])).join('')}
                        </div>
                    </details>
                `;
            },

            readStudentExtraFields() {
                const value = id => document.getElementById(id)?.value.trim() || '';
                const custom = {};
                this.settings().studentFields.forEach(f => {
                    const v = value(`stuCustom_${f.id}`);
                    if (v) custom[f.id] = v;
                });
                return {
                    studentNumber: value('stuNumberInput'),
                    gender: value('stuGenderInput'),
                    birthDate: parseDMY(value('stuBirthInput')) || '',
                    email: value('stuEmailInput'),
                    phone: value('stuOwnPhoneInput'),
                    parentName: value('stuParentInput'),
                    parentEmail: value('stuParentEmailInput'),
                    address: value('stuAddressInput'),
                    custom
                };
            },

            openAddStudentMenu() {
                const option = (icon, title, text, action) => `
                    <button onclick="${action}" class="w-full flex items-center gap-3 text-right p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200">
                        <span class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0"><i class="fa-solid ${icon}"></i></span>
                        <span><strong class="block text-sm text-slate-900">${title}</strong><span class="text-xs text-slate-500">${text}</span></span>
                    </button>
                `;
                this.openModal('إضافة طلاب', `
                    <div class="space-y-2">
                        ${option('fa-user-plus', 'طالب جديد', 'إدخال بيانات طالب واحد مع صورته', 'app.openStudentModal()')}
                        ${option('fa-people-arrows', 'طالب من حلقة أخرى', 'نسخ طلاب موجودين في حلقاتك الأخرى', 'app.openExistingStudentsModal()')}
                        ${option('fa-list', 'قائمة أسماء', 'لصق الأسماء، اسم في كل سطر', 'app.openBulkStudentsModal()')}
                        ${option('fa-file-excel', 'استيراد من Excel', 'ملف xlsx أو csv مع معاينة قبل الإضافة', 'app.openImportModal()')}
                        <input type="file" id="studentsCsvInput" accept=".csv,text/csv" onchange="app.importStudentsCsv(event)" class="hidden">
                    </div>
                `);
            },

            openExistingStudentsModal() {
                const current = this.getActiveClass();
                const names = new Set(current.students.map(s => s.name));
                const others = this.data.classes.filter(c => c.id !== current.id && c.students.length);
                this.openModal('طالب من حلقة أخرى', others.length ? `
                    <form onsubmit="event.preventDefault(); app.copyExistingStudents();" class="space-y-3">
                        ${others.map(c => `
                            <div>
                                <div class="text-xs font-extrabold text-slate-600 mb-1">${esc(c.name)}</div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                    ${c.students.map(st => `
                                        <label class="flex items-center gap-2 text-sm bg-slate-50 rounded-lg p-2 ${names.has(st.name) ? 'opacity-50' : ''}">
                                            <input type="checkbox" name="copyStudent" value="${c.id}|${st.id}" ${names.has(st.name) ? 'disabled' : ''}>
                                            <span class="truncate">${esc(st.name)}</span>
                                        </label>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                        <div class="flex justify-end"><button type="submit" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">إضافة المحددين</button></div>
                    </form>
                ` : '<p class="text-sm text-slate-500">لا يوجد طلاب في حلقات أخرى.</p>');
            },

            copyExistingStudents() {
                const cls = this.getActiveClass();
                const picked = [...document.querySelectorAll('input[name="copyStudent"]:checked')].map(i => i.value.split('|'));
                picked.forEach(([classId, studentId], i) => {
                    const source = this.data.classes.find(c => c.id === classId)?.students.find(s => s.id === studentId);
                    if (!source) return;
                    cls.students.push({ ...JSON.parse(JSON.stringify(source)), id: `stu_${Date.now()}_${i}`, seatIndex: this.nextFreeSeat(cls) });
                });
                this.saveData();
                this.closeModal();
                this.renderClassWorkspace();
                this.showToast(`تمت إضافة ${picked.length} طالب`);
            },

            parseCsv(text) {
                const rows = [];
                let row = [];
                let cell = '';
                let quoted = false;
                for (let i = 0; i < text.length; i++) {
                    const ch = text[i];
                    if (quoted) {
                        if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
                        else if (ch === '"') quoted = false;
                        else cell += ch;
                    } else if (ch === '"') quoted = true;
                    else if (ch === ',' || ch === ';' || ch === '\t') { row.push(cell); cell = ''; }
                    else if (ch === '\n' || ch === '\r') {
                        if (ch === '\r' && text[i + 1] === '\n') i++;
                        row.push(cell); rows.push(row); row = []; cell = '';
                    } else cell += ch;
                }
                if (cell || row.length) { row.push(cell); rows.push(row); }
                return rows.map(r => r.map(c => c.trim())).filter(r => r.some(Boolean));
            },

            importStudentsCsv(event) {
                const file = event.target.files?.[0];
                event.target.value = '';
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                    const rows = this.parseCsv(String(reader.result).replace(/^﻿/, ''));
                    if (!rows.length) return this.showToast('الملف فارغ', 'error');
                    const header = rows[0].map(h => h.toLowerCase());
                    const find = words => header.findIndex(h => words.some(w => h.includes(w)));
                    const hasHeader = find(['اسم', 'name']) !== -1;
                    const col = {
                        name: hasHeader ? find(['اسم', 'name']) : 0,
                        phone: find(['ولي', 'parent phone', 'guardian']),
                        email: find(['بريد', 'email', 'mail']),
                        number: find(['رقم الطالب', 'id', 'number'])
                    };
                    const cls = this.getActiveClass();
                    let added = 0;
                    rows.slice(hasHeader ? 1 : 0).forEach((r, i) => {
                        const name = (r[col.name] || '').slice(0, 200);
                        if (!name) return;
                        cls.students.push({
                            id: `stu_${Date.now()}_${i}`,
                            name,
                            guardianPhone: col.phone >= 0 ? r[col.phone] || '' : '',
                            email: col.email >= 0 ? r[col.email] || '' : '',
                            studentNumber: col.number >= 0 ? r[col.number] || '' : '',
                            notes: '',
                            avatarColor: AVATAR_COLORS[cls.students.length % AVATAR_COLORS.length],
                            seatIndex: this.nextFreeSeat(cls)
                        });
                        added++;
                    });
                    this.data = sanitizeData(this.data);
                    this.saveData();
                    this.closeModal();
                    this.renderClassWorkspace();
                    this.showToast(`تم استيراد ${added} طالب`);
                };
                reader.onerror = () => this.showToast('تعذر قراءة الملف', 'error');
                reader.readAsText(file);
            },

            openMessageMenu() {
                const cls = this.getActiveClass();
                const students = cls.students.filter(s => s.email).length;
                const parents = cls.students.filter(s => s.parentEmail).length;
                this.openModal('مراسلة', `
                    <div class="space-y-2">
                        <button onclick="app.emailClass('students')" class="w-full p-3 rounded-xl bg-indigo-600 text-white text-sm font-bold">إرسال إلى الطلاب (${students})</button>
                        <button onclick="app.emailClass('parents')" class="w-full p-3 rounded-xl bg-white border border-indigo-300 text-indigo-700 text-sm font-bold">إرسال إلى أولياء الأمور (${parents})</button>
                        <p class="text-xs text-slate-500">يفتح برنامج البريد في جهازك برسالة جديدة، والعناوين في خانة «نسخة مخفية».</p>
                    </div>
                `);
            },

            emailClass(target) {
                const cls = this.getActiveClass();
                const emails = cls.students.map(s => (target === 'parents' ? s.parentEmail : s.email)).filter(e => /^[^\s@]+@[^\s@]+$/.test(e || ''));
                if (!emails.length) {
                    this.showToast('لا توجد عناوين بريد مسجلة', 'error');
                    return;
                }
                this.closeModal();
                window.location.href = `mailto:?bcc=${encodeURIComponent(emails.join(','))}&subject=${encodeURIComponent(cls.name)}`;
            },

            /* ==========================================
               GRADEBOOK WITH CATEGORIES
               ========================================== */
            renderGradesTab(cls, container) {
                const categories = cls.categories || [];
                const groups = [
                    ...categories.map(c => ({ cat: c, items: cls.assessments.filter(a => a.category === c.id) })),
                    { cat: null, items: cls.assessments.filter(a => !categories.some(c => c.id === a.category)) }
                ].filter(g => g.items.length);
                const ordered = groups.flatMap(g => g.items);
                const weighted = categories.some(c => c.weight > 0);

                container.innerHTML = `
                    <div class="animate-pop space-y-3">
                        ${this.classToolbar(`
                            <button onclick="app.openAssessmentModal()" class="tool-btn active"><i class="fa-solid fa-plus"></i><span>تقييم</span></button>
                            <button onclick="app.openCategoriesModal()" class="tool-btn"><i class="fa-solid fa-layer-group"></i><span>الفئات${weighted ? ' والأوزان' : ''}</span></button>
                        `)}
                        ${weighted ? '<p class="floor-hint">النسبة محسوبة بأوزان الفئات</p>' : ''}
                        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div class="overflow-x-auto">
                                <table class="w-full text-right border-collapse grade-table">
                                    <thead>
                                        <tr class="text-xs font-extrabold">
                                            <th rowspan="2" class="sticky right-0 z-10 bg-slate-50 py-3 px-3 min-w-[130px] border-l border-slate-200">الطالب</th>
                                            ${groups.map(g => `<th colspan="${g.items.length}" class="py-2 px-2 text-center border-l border-slate-200 bg-indigo-50 text-indigo-800">${g.cat ? esc(g.cat.name) + (g.cat.weight ? ` (${g.cat.weight}%)` : '') : 'دون فئة'}</th>`).join('')}
                                            <th rowspan="2" class="py-3 px-3 text-center bg-slate-50 min-w-[90px]">المجموع</th>
                                            <th rowspan="2" class="py-3 px-3 text-center bg-slate-50 min-w-[110px]">التقدير</th>
                                        </tr>
                                        <tr class="text-[11px] font-bold text-slate-600 bg-slate-50">
                                            ${ordered.map(a => `
                                                <th class="py-2 px-2 text-center border-l border-slate-200 min-w-[96px]">
                                                    <button onclick="app.openAssessmentModal('${a.id}')" class="font-extrabold text-slate-800 hover:text-indigo-700 underline decoration-dotted">${esc(a.title)}</button>
                                                    <div class="text-[10px] text-slate-500">من ${a.maxScore}${a.date ? ` • ${fmtDate(a.date)}` : ''}</div>
                                                </th>
                                            `).join('')}
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-200 text-sm">
                                        ${cls.students.map((st, row) => {
                                            const stats = this.getStudentGradeStats(cls, st.id);
                                            const marks = (cls.grades || {})[st.id] || {};
                                            return `
                                                <tr>
                                                    <td class="sticky right-0 z-10 bg-white py-2 px-3 border-l border-slate-200 font-bold text-slate-800 max-w-[150px] truncate">${esc(st.name)}</td>
                                                    ${ordered.map((a, colIndex) => `
                                                        <td class="p-1.5 text-center border-l border-slate-100">
                                                            <input type="number" inputmode="decimal" min="0" step="any" max="${a.maxScore}" value="${marks[a.id] ?? ''}"
                                                                data-row="${row}" data-col="${colIndex}" aria-label="${esc(st.name)}: ${esc(a.title)}"
                                                                onchange="app.updateStudentScore('${st.id}', '${a.id}', this, ${a.maxScore})" onkeydown="app.gradeKey(event)"
                                                                class="w-16 text-center font-bold py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white">
                                                        </td>
                                                    `).join('')}
                                                    <td id="grade_sum_${st.id}" class="py-2 px-3 text-center font-extrabold">${this.gradeSumHtml(stats)}</td>
                                                    <td id="grade_pct_${st.id}" class="py-2 px-3 text-center">${this.gradeBadgeHtml(stats)}</td>
                                                </tr>
                                            `;
                                        }).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        ${!ordered.length ? '<p class="text-center text-sm text-slate-500 py-6">أضف أول تقييم لبدء الرصد</p>' : ''}
                    </div>
                `;
            },

            /** Enter moves down the column, the way teachers fill a paper gradebook. */
            gradeKey(event) {
                if (event.key !== 'Enter') return;
                event.preventDefault();
                const input = event.target;
                input.dispatchEvent(new Event('change'));
                const next = document.querySelector(`input[data-row="${Number(input.dataset.row) + 1}"][data-col="${input.dataset.col}"]`);
                next?.focus();
                next?.select();
            },

            openAssessmentModal(assId = null) {
                const cls = this.getActiveClass();
                const existing = assId ? cls.assessments.find(a => a.id === assId) : null;
                const field = 'w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm';
                this.openModal(existing ? 'تعديل التقييم' : 'تقييم جديد', `
                    <form onsubmit="event.preventDefault(); app.saveAssessment('${assId || ''}');" class="space-y-3">
                        <div>
                            <label for="newAssTitle" class="block text-xs font-bold text-slate-700 mb-1">العنوان</label>
                            <input type="text" id="newAssTitle" required value="${esc(existing?.title || '')}" placeholder="مثال: اختبار قصير" class="${field}">
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label for="newAssMax" class="block text-xs font-bold text-slate-700 mb-1">الدرجة العظمى</label>
                                <input type="number" id="newAssMax" required min="1" max="1000" value="${existing?.maxScore ?? 20}" class="${field}">
                            </div>
                            <div>
                                <label for="newAssDate" class="block text-xs font-bold text-slate-700 mb-1">التاريخ</label>
                                ${this.dateInputHtml('newAssDate', existing?.date || getTodayStr(0))}
                            </div>
                        </div>
                        <div>
                            <label for="newAssCategory" class="block text-xs font-bold text-slate-700 mb-1">الفئة</label>
                            <select id="newAssCategory" class="${field}">
                                <option value="">دون فئة</option>
                                ${(cls.categories || []).map(c => `<option value="${c.id}" ${existing?.category === c.id ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}
                            </select>
                        </div>
                        <div class="flex justify-between gap-2 pt-2">
                            ${existing ? `<button type="button" onclick="app.confirmDeleteAssessment('${assId}')" class="px-4 py-2 rounded-xl bg-white border border-rose-300 text-rose-700 text-xs font-bold">حذف</button>` : '<span></span>'}
                            <button type="submit" class="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">حفظ</button>
                        </div>
                    </form>
                `);
            },

            saveAssessment(assId) {
                const cls = this.getActiveClass();
                const title = document.getElementById('newAssTitle').value.trim();
                const maxScore = Number(document.getElementById('newAssMax').value) || 10;
                const date = this.readDateInput('newAssDate', 'تاريخ التقييم');
                if (date === null) return;
                const category = document.getElementById('newAssCategory').value;
                if (!title) return;
                if (assId) {
                    Object.assign(cls.assessments.find(a => a.id === assId) || {}, { title, maxScore, date, category });
                } else {
                    cls.assessments.push({ id: `ass_${Date.now()}`, title, maxScore, date, category });
                }
                this.saveData();
                this.closeModal();
                this.renderClassWorkspace();
                this.showToast(assId ? 'تم تحديث التقييم' : 'تمت إضافة التقييم');
            },

            openCategoriesModal() {
                const cls = this.getActiveClass();
                const field = 'px-2 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold';
                const total = (cls.categories || []).reduce((s, c) => s + (Number(c.weight) || 0), 0);
                this.openModal('فئات التقييم وأوزانها', `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-500">مثل: الاختبارات 50%، الواجبات 30%، المشاركة 20%. اترك الأوزان صفرًا ليُحسب المجموع بالدرجات مباشرة.</p>
                        <div class="space-y-2">
                            ${(cls.categories || []).map((c, i) => this.editorRow(`
                                <input type="text" aria-label="اسم الفئة" value="${esc(c.name)}" onchange="app.updateCategory(${i}, 'name', this.value)" class="${field} flex-1 min-w-0">
                                <input type="number" aria-label="الوزن" min="0" max="100" value="${c.weight}" onchange="app.updateCategory(${i}, 'weight', this.value)" class="${field} w-20 text-center">
                                <span class="text-xs font-bold text-slate-500">%</span>
                                <button onclick="app.removeCategory(${i})" title="حذف الفئة" class="w-9 h-9 rounded-lg bg-white border border-slate-200 text-rose-600 shrink-0"><i class="fa-solid fa-xmark"></i></button>
                            `)).join('') || '<p class="text-xs text-slate-500">لا توجد فئات بعد.</p>'}
                        </div>
                        ${total && total !== 100 ? `<p class="text-xs font-bold text-amber-700">مجموع الأوزان ${total}%، ويُعاد توزيعه نسبيًا عند الحساب.</p>` : ''}
                        <div class="flex justify-between gap-2">
                            <button onclick="app.addCategory()" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">+ فئة</button>
                            <button onclick="app.closeModal(); app.renderClassWorkspace();" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">تم</button>
                        </div>
                    </div>
                `);
            },

            addCategory() {
                const cls = this.getActiveClass();
                cls.categories = [...(cls.categories || []), { id: `cat_${Date.now()}`, name: 'فئة جديدة', weight: 0 }];
                this.saveData();
                this.openCategoriesModal();
            },

            updateCategory(index, key, value) {
                const cat = this.getActiveClass().categories?.[index];
                if (!cat) return;
                cat[key] = key === 'weight' ? Math.max(0, Math.min(100, Number(value) || 0)) : value.slice(0, 80);
                this.saveData();
            },

            removeCategory(index) {
                const cls = this.getActiveClass();
                const [removed] = cls.categories.splice(index, 1);
                cls.assessments.forEach(a => { if (a.category === removed?.id) a.category = ''; });
                this.saveData();
                this.openCategoriesModal();
            },

            /* ==========================================
               REPORT CHARTS
               ========================================== */
            donutSvg(parts) {
                const total = parts.reduce((s, p) => s + p.value, 0);
                if (!total) return '<div class="text-xs text-slate-500 py-8 text-center">لا توجد بيانات</div>';
                const r = 15.915;
                let offset = 25;
                return `
                    <svg viewBox="0 0 42 42" class="w-28 h-28 shrink-0" role="img" aria-label="${parts.map(p => `${p.label} ${p.value}`).join('، ')}">
                        <circle cx="21" cy="21" r="${r}" fill="none" stroke="rgb(var(--bg-slate-200))" stroke-width="6"></circle>
                        ${parts.filter(p => p.value).map(p => {
                            const len = (p.value / total) * 100;
                            const seg = `<circle cx="21" cy="21" r="${r}" fill="none" stroke="${p.color}" stroke-width="6" stroke-dasharray="${len} ${100 - len}" stroke-dashoffset="${offset}"></circle>`;
                            offset -= len;
                            return seg;
                        }).join('')}
                    </svg>
                `;
            },

            reportChartsHtml(cls) {
                const types = this.attendanceTypes();
                const counts = Object.fromEntries(types.map(t => [t.id, 0]));
                Object.values(cls.attendance || {}).forEach(day => {
                    cls.students.forEach(st => { if (day?.[st.id] in counts) counts[day[st.id]]++; });
                });
                const attParts = types.map(t => ({ label: t.label, value: counts[t.id], color: t.color }));

                let positive = 0;
                let negative = 0;
                (cls.behaviorLogs || []).forEach(l => { if (l.points > 0) positive++; else negative++; });

                const levels = [...this.settings().gradeLevels].sort((a, b) => b.min - a.min);
                const levelCounts = levels.map(l => ({ label: l.label, value: 0 }));
                cls.students.forEach(st => {
                    const stats = this.getStudentGradeStats(cls, st.id);
                    if (stats.pct === null) return;
                    const hit = levelCounts.find(l => l.label === stats.label);
                    if (hit) hit.value++;
                });
                const maxLevel = Math.max(1, ...levelCounts.map(l => l.value));

                const card = (title, body) => `<div class="bg-white rounded-2xl border border-slate-200 p-4"><h3 class="text-sm font-extrabold text-slate-900 mb-3">${title}</h3>${body}</div>`;
                return `
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                        ${card('الحضور', `
                            <div class="flex items-center gap-4">
                                ${this.donutSvg(attParts)}
                                <div class="space-y-1 text-xs">
                                    ${attParts.map(p => `<div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full" style="background:${p.color}"></span><span class="text-slate-700">${esc(p.label)}</span><strong class="text-slate-900">${p.value}</strong></div>`).join('')}
                                </div>
                            </div>
                        `)}
                        ${card('السلوك', `
                            <div class="grid grid-cols-2 gap-3 text-center">
                                <div class="rounded-xl bg-emerald-50 border border-emerald-200 p-3"><i class="fa-solid fa-thumbs-up text-emerald-600"></i><div class="text-2xl font-extrabold text-emerald-700">${positive}</div><div class="text-[11px] text-slate-600">إيجابي</div></div>
                                <div class="rounded-xl bg-rose-50 border border-rose-200 p-3"><i class="fa-solid fa-thumbs-down text-rose-600"></i><div class="text-2xl font-extrabold text-rose-700">${negative}</div><div class="text-[11px] text-slate-600">سلبي</div></div>
                            </div>
                        `)}
                        ${card('توزيع التقديرات', `
                            <div class="flex items-end gap-2 h-32" role="img" aria-label="${levelCounts.map(l => `${l.label} ${l.value}`).join('، ')}">
                                ${levelCounts.map(l => `
                                    <div class="flex-1 flex flex-col items-center justify-end h-full gap-1 min-w-0">
                                        <span class="text-[11px] font-extrabold text-slate-800">${l.value}</span>
                                        <div class="w-full rounded-t-md bg-gradient-to-t from-indigo-600 to-indigo-400" style="height: ${(l.value / maxLevel) * 80}%; min-height: 3px"></div>
                                        <span class="text-[10px] font-bold text-slate-600 truncate max-w-full">${esc(l.label)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        `)}
                    </div>
                `;
            },

            /* ==========================================
               CLASS WEEK CALENDAR
               ========================================== */
            renderCalendarTab(cls, container) {
                const sessions = cls.sessions || [];
                const startHour = Math.min(7, ...sessions.map(s => Math.floor(minutesOf(s.start) / 60)));
                const endHour = Math.max(19, ...sessions.map(s => Math.ceil(minutesOf(s.end) / 60)));
                const hours = endHour - startHour;
                const hourHeight = 44;
                const today = new Date().getDay();
                const theme = CLASS_THEMES[cls.theme] || CLASS_THEMES.indigo;

                container.innerHTML = `
                    <div class="animate-pop space-y-3">
                        ${this.classToolbar(`<button onclick="app.openClassModal('${cls.id}')" class="tool-btn active"><i class="fa-regular fa-calendar-plus"></i><span>تعديل المواعيد</span></button>`)}
                        <div class="bg-white rounded-2xl border border-slate-200 overflow-x-auto">
                            <div class="week-grid" style="--hours: ${hours}; --hour-h: ${hourHeight}px">
                                <div class="week-head"></div>
                                ${WEEK_DAYS.map((d, i) => `<div class="week-head ${i === today ? 'today' : ''}">${d}</div>`).join('')}
                                <div class="week-hours">
                                    ${Array.from({ length: hours }, (_, i) => `<div style="height: ${hourHeight}px" dir="ltr">${String(startHour + i).padStart(2, '0')}:00</div>`).join('')}
                                </div>
                                ${WEEK_DAYS.map((_, day) => `
                                    <div class="week-col ${day === today ? 'today' : ''}" style="height: ${hours * hourHeight}px">
                                        ${sessions.filter(s => s.day === day).map(s => {
                                            const top = ((minutesOf(s.start) - startHour * 60) / 60) * hourHeight;
                                            const height = Math.max(22, ((minutesOf(s.end) - minutesOf(s.start)) / 60) * hourHeight);
                                            return `<button onclick="app.openSessionClass('${cls.id}')" class="week-event bg-gradient-to-l ${theme.bgGrad}" style="top: ${top}px; height: ${height}px"><span dir="ltr">${esc(s.start)}</span> ${esc(this.sessionLabel(cls))}</button>`;
                                        }).join('')}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        ${sessions.length ? '' : '<p class="text-center text-sm text-slate-500">لم تُحدد مواعيد لهذه الحلقة بعد</p>'}
                    </div>
                `;
            },

            /* ==========================================
               DATES (always DD/MM/YYYY on screen, YYYY-MM-DD in storage)
               ========================================== */
            dateInputHtml(id, iso, extra = '') {
                return `
                    <span class="date-field">
                        <input type="text" id="${id}" inputmode="numeric" dir="ltr" autocomplete="off" placeholder="DD/MM/YYYY" maxlength="10" value="${esc(fmtDate(iso))}" ${extra}>
                        <button type="button" onclick="app.pickDate('${id}')" aria-label="اختيار التاريخ من التقويم" title="اختيار من التقويم"><i class="fa-regular fa-calendar"></i></button>
                        <input type="date" class="date-native" tabindex="-1" aria-hidden="true" value="${esc(iso || '')}"
                            onchange="const t = document.getElementById('${id}'); t.value = fmtDate(this.value); t.dispatchEvent(new Event('change'));">
                    </span>
                `;
            },

            pickDate(id) {
                const text = document.getElementById(id);
                const native = text?.parentElement.querySelector('.date-native');
                if (!native) return;
                native.value = parseDMY(text.value) || getTodayStr(0);
                try {
                    native.showPicker();
                } catch (e) {
                    native.focus();
                    native.click();
                }
            },

            /** Returns YYYY-MM-DD, '' when empty, or null (with a message) when the text is not a real date. */
            readDateInput(id, label) {
                const raw = (document.getElementById(id)?.value || '').trim();
                if (!raw) return '';
                const iso = parseDMY(raw);
                if (!iso) this.showToast(`${label}: اكتب التاريخ بالشكل يوم/شهر/سنة، مثل 05/11/2026`, 'error');
                return iso;
            },

            onAttendanceDateText(value) {
                const iso = parseDMY(value);
                if (!iso) {
                    this.showToast('اكتب التاريخ بالشكل يوم/شهر/سنة', 'error');
                    return;
                }
                this.selectedDate = iso;
                this.selectedLesson = 1;
                this.renderClassWorkspace();
            },

            /* ==========================================
               DAY AND NIGHT SWITCH
               ========================================== */
            chooseTheme(mode, event) {
                if (this.wantsDark() === (mode === 'dark')) {
                    this.themeMode = mode;
                    localStorage.setItem(this.THEME_KEY, mode);
                    this.updateThemeChoices();
                    return;
                }
                this.themeMode = mode;
                localStorage.setItem(this.THEME_KEY, mode);
                sfx.play('click');
                this.switchTheme(event);
                this.updateThemeChoices();
            },

            /* ==========================================
               SCHEDULE: WEEKLY OR MONTHLY, AND EACH SESSION
               ========================================== */
            planOf(cls) {
                return cls.schedulePlan || cleanPlan({});
            },

            /** The sessions the plan creates between two dates, before single-session changes. */
            baseOccurrences(cls, fromIso, toIso) {
                const plan = this.planOf(cls);
                const result = [];
                let day = isoToDate(fromIso > (plan.startDate || '') ? fromIso : plan.startDate);
                const end = isoToDate(toIso);
                for (let guard = 0; day <= end && guard < 800; guard++) {
                    const iso = dateToIso(day);
                    const slots = [];
                    if (plan.type === 'monthly') {
                        const m = plan.monthly;
                        const dom = day.getDate();
                        const lastDom = new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate();
                        const week = Math.floor((dom - 1) / 7) + 1;
                        const hit = m.mode === 'dates'
                            ? m.days.includes(dom)
                            : day.getDay() === m.weekday && (m.weeks.includes(week) || (m.weeks.includes(-1) && dom + 7 > lastDom));
                        if (hit) slots.push({ start: m.start, end: m.end });
                    } else {
                        (cls.sessions || []).filter(s => s.day === day.getDay()).forEach(s => slots.push({ start: s.start, end: s.end }));
                    }
                    slots.sort((a, b) => a.start.localeCompare(b.start)).forEach(s => {
                        result.push({ origKey: `${iso}@${s.start}`, date: iso, start: s.start, end: s.end });
                    });
                    day.setDate(day.getDate() + 1);
                }
                return result;
            },

            /** Sessions in a date range after cancellations and moves, each with the key its records use. */
            occurrences(cls, fromIso, toIso) {
                const widen = (iso, days) => {
                    const d = isoToDate(iso);
                    d.setDate(d.getDate() + days);
                    return dateToIso(d);
                };
                const overrides = cls.lessonOverrides || {};
                const list = this.baseOccurrences(cls, widen(fromIso, -62), widen(toIso, 62)).map(o => {
                    const change = overrides[o.origKey];
                    if (change?.cancelled) return { ...o, cancelled: true };
                    if (change?.date) return { ...o, date: change.date, start: change.start || o.start, end: change.end || o.end, moved: true };
                    return o;
                }).filter(o => o.date >= fromIso && o.date <= toIso);

                list.sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
                const perDay = {};
                list.forEach(o => {
                    if (o.cancelled) return;
                    perDay[o.date] = (perDay[o.date] || 0) + 1;
                    o.key = lessonKeyOf(o.date, perDay[o.date]);
                });
                list.forEach(o => { if (o.cancelled) o.key = lessonKeyOf(o.date, 1); });
                return list;
            },

            /** A session counts as held once anything was recorded for it. */
            isRecorded(cls, key) {
                const date = key.split('~')[0];
                if (Object.keys((cls.attendance || {})[key] || {}).length) return true;
                if ((cls.lessonNotes || {})[key]) return true;
                return Object.values(cls.quranRecords || {}).some(rec => (rec.logs || []).some(l =>
                    l.lessonKey ? l.lessonKey === key : (key === date && l.date === date)
                ));
            },

            recordedKeys(cls) {
                const keys = new Set(Object.keys(cls.attendance || {}).filter(k => Object.keys(cls.attendance[k] || {}).length));
                Object.keys(cls.lessonNotes || {}).forEach(k => keys.add(k));
                Object.values(cls.quranRecords || {}).forEach(rec => (rec.logs || []).forEach(l => keys.add(l.lessonKey || l.date)));
                return [...keys].filter(k => /^\d{4}-\d{2}-\d{2}(~\d{1,2})?$/.test(k));
            },

            /** Upcoming, past (held), missed and cancelled sessions of one circle. */
            sessionBuckets(cls) {
                const now = new Date();
                const today = getTodayStr(0);
                const nowTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
                const plan = this.planOf(cls);
                const recorded = this.recordedKeys(cls);
                const earliestRecord = recorded.map(k => k.split('~')[0]).sort()[0];
                const back = new Date();
                back.setDate(back.getDate() - 120);
                const from = [plan.startDate, cls.termStart, earliestRecord, dateToIso(back)].filter(Boolean).sort().reverse()
                    .find(d => d <= today) || dateToIso(back);
                const ahead = new Date();
                ahead.setDate(ahead.getDate() + 90);

                const all = this.occurrences(cls, from < dateToIso(back) ? dateToIso(back) : from, dateToIso(ahead));
                const isPast = o => o.date < today || (o.date === today && o.end <= nowTime);
                const upcoming = all.filter(o => !isPast(o)).slice(0, 40);
                const pastScheduled = all.filter(isPast);
                const held = [];
                const missed = [];
                const cancelled = pastScheduled.filter(o => o.cancelled);
                pastScheduled.filter(o => !o.cancelled).forEach(o => (this.isRecorded(cls, o.key) ? held : missed).push(o));
                // Records on days without a scheduled session are extra sessions.
                recorded.filter(k => !all.some(o => o.key === k && !o.cancelled)).forEach(k => {
                    if (k.split('~')[0] <= today) held.push({ key: k, date: k.split('~')[0], start: '', end: '', extra: true });
                });
                const byDateDesc = (a, b) => (b.date + (b.start || '')).localeCompare(a.date + (a.start || ''));
                return { upcoming, held: held.sort(byDateDesc), missed: missed.sort(byDateDesc), cancelled: cancelled.sort(byDateDesc) };
            },

            sessionSummary(cls, key) {
                const day = (cls.attendance || {})[key] || {};
                const present = cls.students.filter(st => ['present', 'late'].includes(this.attendanceMeaning(day[st.id]))).length;
                let fresh = 0;
                let review = 0;
                Object.values(cls.quranRecords || {}).forEach(rec => (rec.logs || []).forEach(l => {
                    if ((l.lessonKey || l.date) !== key) return;
                    if (l.sessionType === 'new') fresh++;
                    else review++;
                }));
                return { present, total: cls.students.length, fresh, review };
            },

            renderSessionsTab(cls, container) {
                const buckets = this.sessionBuckets(cls);
                const filter = this.sessionsFilter;
                const today = getTodayStr(0);
                const todays = buckets.upcoming.find(o => o.date === today && !o.cancelled) || buckets.missed.find(o => o.date === today);
                const plan = this.planOf(cls);
                const planText = plan.type === 'monthly' ? `جدول شهري: ${this.monthlyText(plan.monthly)}` : `جدول أسبوعي: ${this.scheduleText(cls)}`;
                const chip = (label, cls2) => `<span class="sess-chip ${cls2}">${label}</span>`;
                const row = (o, kind) => {
                    const when = `${weekdayName(o.date)} ${fmtDate(o.date)}${o.start ? ` • <span dir="ltr">${esc(o.start)}${o.end ? ` - ${esc(o.end)}` : ''}</span>` : ''}`;
                    let status = '';
                    let actions = '';
                    if (kind === 'upcoming') {
                        status = o.cancelled ? chip('ملغاة', 'cancelled') : (o.moved ? chip('موعد معدّل', 'moved') : chip('مقررة', 'planned'));
                        actions = o.cancelled
                            ? `<button onclick="app.restoreOccurrence('${o.origKey}')" class="sess-btn">استعادة</button>`
                            : `${o.date === today ? `<button onclick="app.openSession('${o.key}', true)" class="sess-btn primary">تسجيل</button>` : ''}
                               <button onclick="app.openRescheduleModal('${o.origKey}')" class="sess-btn">تعديل الموعد</button>
                               <button onclick="app.confirmCancelOccurrence('${o.origKey}')" class="sess-btn danger">إلغاء</button>`;
                    } else if (kind === 'held') {
                        const s = this.sessionSummary(cls, o.key);
                        status = `${chip(o.extra ? 'حصة إضافية' : 'منعقدة', 'held')}<span class="sess-meta">حضر ${s.present}/${s.total} • حفظ ${s.fresh} • مراجعة ${s.review}</span>`;
                        actions = `<button onclick="app.openSession('${o.key}')" class="sess-btn primary">فتح السجل</button>`;
                    } else if (kind === 'missed') {
                        status = chip('لم تُسجَّل', 'missed');
                        actions = `<button onclick="app.openSession('${o.key}', true)" class="sess-btn primary">تسجيلها</button>
                                   <button onclick="app.confirmCancelOccurrence('${o.origKey}')" class="sess-btn">لم تنعقد</button>`;
                    } else {
                        status = chip('ملغاة', 'cancelled');
                        actions = `<button onclick="app.restoreOccurrence('${o.origKey}')" class="sess-btn">استعادة</button>`;
                    }
                    return `
                        <div class="sess-row ${o.cancelled ? 'is-cancelled' : ''}">
                            <div class="min-w-0">
                                <div class="sess-when">${when}</div>
                                <div class="flex flex-wrap items-center gap-1.5 mt-1">${status}</div>
                            </div>
                            <div class="sess-actions">${actions}</div>
                        </div>
                    `;
                };
                const tabs = [
                    ['upcoming', 'القادمة', buckets.upcoming.length],
                    ['held', 'السابقة', buckets.held.length],
                    ['missed', 'الفائتة دون تسجيل', buckets.missed.length],
                    ['cancelled', 'الملغاة', buckets.cancelled.length]
                ];
                const list = buckets[filter] || [];

                container.innerHTML = `
                    <div class="animate-pop space-y-3">
                        ${this.classToolbar(`
                            <button onclick="app.openSession('${todays ? todays.key : today}', true)" class="tool-btn active"><i class="fa-solid fa-pen-to-square"></i><span>تسجيل حصة اليوم</span></button>
                            <button onclick="app.openClassModal('${cls.id}', 'schedule')" class="tool-btn"><i class="fa-regular fa-calendar"></i><span>تعديل الجدول</span></button>
                        `)}
                        <p class="floor-hint">${esc(planText)}${plan.startDate ? ` • يبدأ من ${fmtDate(plan.startDate)}` : ''}</p>
                        <div class="sess-tabs" role="tablist">
                            ${tabs.map(([key, label, n]) => `<button role="tab" aria-selected="${filter === key}" onclick="app.sessionsFilter = '${key}'; app.renderClassWorkspace();" class="${filter === key ? 'active' : ''} ${key === 'missed' && n ? 'warn' : ''}">${label} <b>${n}</b></button>`).join('')}
                        </div>
                        <div class="sess-list">
                            ${list.length ? list.map(o => row(o, filter)).join('') : `<p class="text-center text-sm text-slate-500 py-8">${{
                                upcoming: 'لا توجد حصص قادمة. حدد أيام الحلقة ومواعيدها من «تعديل الجدول».',
                                held: 'لم تُسجَّل أي حصة بعد.',
                                missed: 'لا توجد حصص فائتة، أحسنت.',
                                cancelled: 'لا توجد حصص ملغاة.'
                            }[filter]}</p>`}
                        </div>
                    </div>
                `;
            },

            monthlyText(m) {
                if (m.mode === 'dates') return `أيام ${m.days.join('، ')} من كل شهر • ${m.start}`;
                const names = { 1: 'الأول', 2: 'الثاني', 3: 'الثالث', 4: 'الرابع', 5: 'الخامس', '-1': 'الأخير' };
                return `${WEEK_DAYS[m.weekday]} ${m.weeks.map(w => names[w]).join(' و')} من كل شهر • ${m.start}`;
            },

            confirmCancelOccurrence(origKey) {
                const date = origKey.split('@')[0];
                this.openModal('إلغاء حصة', `
                    <div class="space-y-4">
                        <p class="text-sm text-slate-600">ستُلغى حصة ${weekdayName(date)} ${fmtDate(date)} فقط، ولا تتأثر بقية الحصص. يمكنك استعادتها لاحقًا.</p>
                        <div class="flex justify-end gap-2">
                            <button onclick="app.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">تراجع</button>
                            <button onclick="app.cancelOccurrence('${origKey}')" class="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold">نعم، ألغِ هذه الحصة</button>
                        </div>
                    </div>
                `);
            },

            cancelOccurrence(origKey) {
                const cls = this.getActiveClass();
                cls.lessonOverrides = { ...(cls.lessonOverrides || {}), [origKey]: { cancelled: true } };
                this.saveData();
                this.closeModal();
                this.renderClassWorkspace();
                this.showToast('أُلغيت الحصة، وبقيت بقية الجدول كما هي');
            },

            restoreOccurrence(origKey) {
                const cls = this.getActiveClass();
                delete (cls.lessonOverrides || {})[origKey];
                this.saveData();
                this.renderClassWorkspace();
                this.showToast('أُعيدت الحصة إلى الجدول');
            },

            openRescheduleModal(origKey) {
                const cls = this.getActiveClass();
                const [date, start] = origKey.split('@');
                const current = (cls.lessonOverrides || {})[origKey] || {};
                const base = this.baseOccurrences(cls, date, date).find(o => o.origKey === origKey) || { start, end: start };
                this.openModal('تعديل موعد هذه الحصة', `
                    <form onsubmit="event.preventDefault(); app.saveReschedule('${origKey}');" class="space-y-3">
                        <p class="text-xs text-slate-500">الموعد الأصلي: ${weekdayName(date)} ${fmtDate(date)} • <span dir="ltr">${esc(base.start)}</span>. التعديل يخص هذه الحصة وحدها.</p>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">التاريخ الجديد</label>
                            ${this.dateInputHtml('reschDate', current.date || date)}
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div><label for="reschStart" class="block text-xs font-bold text-slate-700 mb-1">البداية</label><input type="time" id="reschStart" dir="ltr" value="${esc(current.start || base.start)}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"></div>
                            <div><label for="reschEnd" class="block text-xs font-bold text-slate-700 mb-1">النهاية</label><input type="time" id="reschEnd" dir="ltr" value="${esc(current.end || base.end)}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"></div>
                        </div>
                        <div class="flex justify-end gap-2">
                            <button type="button" onclick="app.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">تراجع</button>
                            <button type="submit" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">حفظ الموعد</button>
                        </div>
                    </form>
                `);
            },

            saveReschedule(origKey) {
                const cls = this.getActiveClass();
                const date = this.readDateInput('reschDate', 'التاريخ');
                const start = document.getElementById('reschStart').value;
                const end = document.getElementById('reschEnd').value;
                if (!date) {
                    if (date === '') this.showToast('اكتب التاريخ الجديد', 'error');
                    return;
                }
                if (!start || !end || start >= end) {
                    this.showToast('يجب أن تكون البداية قبل النهاية', 'error');
                    return;
                }
                cls.lessonOverrides = { ...(cls.lessonOverrides || {}), [origKey]: { date, start, end } };
                this.saveData();
                this.closeModal();
                this.renderClassWorkspace();
                this.showToast(`نُقلت الحصة إلى ${fmtDate(date)}`);
            },

            /* ==========================================
               SESSION RECORD: EACH STUDENT'S NEW MEMORIZATION, REVISION, BEHAVIOR
               ========================================== */
            openSession(key, edit = false) {
                this.activeSessionKey = key;
                this.sessionEdit = edit;
                this.activeTab = 'session';
                this.animateNext = true;
                this.renderClassWorkspace();
                window.scrollTo({ top: 0 });
            },

            sessionEntry(cls, stId, key, type) {
                return (cls.quranRecords?.[stId]?.logs || []).find(l => l.sessionType === type && (l.lessonKey ? l.lessonKey === key : (l.date === key)));
            },

            renderSessionPage(cls, container) {
                const key = this.activeSessionKey;
                const [date, lessonPart] = key.split('~');
                const lesson = Number(lessonPart || 1);
                const occ = this.occurrences(cls, date, date).filter(o => !o.cancelled)[lesson - 1];
                const day = (cls.attendance || {})[key] || {};
                const notes = (cls.lessonNotes || {})[key] || '';
                const studentNotes = (cls.lessonStudentNotes || {})[key] || {};
                const behaviorOf = stId => (cls.behaviorLogs || []).filter(l => l.studentId === stId && (l.lessonKey ? l.lessonKey === key : l.date === date));
                const recorded = this.isRecorded(cls, key);
                const title = `${weekdayName(date)} ${fmtDate(date)}${occ ? ` • ${occ.start} - ${occ.end}` : ''}${lesson > 1 ? ` • الحصة ${lesson}` : ''}`;
                const entryText = e => (e ? `${esc(e.surahName)} (${e.fromAyah}-${e.toAyah})${e.reviewKind ? ` <span class="text-[10px] text-slate-500">${quranTypeLabel(e)}</span>` : ''}` : '<span class="text-slate-400">—</span>');
                const ratingChip = e => (e ? `<span class="rate-chip">${esc(e.rating)}${e.errors ? ` • ${e.errors} أخطاء` : ''}</span>` : '');

                const header = `
                    <div class="session-head">
                        <button onclick="app.activeTab = 'sessions'; app.renderClassWorkspace();" class="tool-btn" aria-label="رجوع إلى الحصص"><i class="fa-solid fa-arrow-right"></i><span>الحصص</span></button>
                        <div class="min-w-0">
                            <h2 class="text-lg font-extrabold text-slate-900">سجل الحصة</h2>
                            <p class="text-xs font-bold text-slate-600">${esc(title)}${recorded ? '' : ' • لم تُسجَّل بعد'}</p>
                        </div>
                        ${this.sessionEdit ? '' : `<button onclick="app.sessionEdit = true; app.renderClassWorkspace();" class="tool-btn active"><i class="fa-solid fa-pen"></i><span>${recorded ? 'تعديل التسجيل' : 'تسجيل الحصة'}</span></button>`}
                    </div>
                `;

                if (!this.sessionEdit) {
                    container.innerHTML = `
                        <div class="animate-pop space-y-3">
                            ${header}
                            ${notes ? `<div class="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-sm text-slate-800"><b>ملاحظات الحصة:</b> ${esc(notes)}</div>` : ''}
                            <div class="bg-white rounded-2xl border border-slate-200 overflow-x-auto">
                                <table class="w-full text-right text-sm session-table">
                                    <thead><tr><th>الطالب</th><th>الحضور</th><th>التسميع الجديد</th><th>تقييم الجديد</th><th>المراجعة</th><th>تقييم المراجعة</th><th>السلوك والملاحظات</th></tr></thead>
                                    <tbody>
                                        ${cls.students.map(st => {
                                            const type = this.attendanceType(day[st.id]);
                                            const fresh = this.sessionEntry(cls, st.id, key, 'new');
                                            const review = this.sessionEntry(cls, st.id, key, 'revision');
                                            const beh = behaviorOf(st.id);
                                            return `
                                                <tr>
                                                    <td class="font-bold"><button onclick="app.openStudentFile('${st.id}')" class="hover:underline text-right">${esc(st.name)}</button></td>
                                                    <td>${type ? `<span class="att-pill" style="background:${type.color}">${esc(type.label)}</span>` : '<span class="text-slate-400">لم يُرصد</span>'}</td>
                                                    <td>${entryText(fresh)}</td>
                                                    <td>${ratingChip(fresh)}</td>
                                                    <td>${entryText(review)}</td>
                                                    <td>${ratingChip(review)}</td>
                                                    <td class="text-xs">${beh.map(l => `<span class="${l.points > 0 ? 'text-emerald-700' : 'text-rose-600'} font-bold">${esc(l.label)}</span>${l.note ? ` (${esc(l.note)})` : ''}`).join('، ')}${studentNotes[st.id] ? `<div class="text-slate-600">${esc(studentNotes[st.id])}</div>` : ''}${!beh.length && !studentNotes[st.id] ? '<span class="text-slate-400">—</span>' : ''}</td>
                                                </tr>
                                            `;
                                        }).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `;
                    return;
                }

                const field = 'w-full px-2 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold';
                const types = this.attendanceTypes();
                const ratings = ['ممتاز متقن', 'جيد جداً', 'جيد', 'يحتاج إعادة'];
                const quranFields = (st, kind, e) => {
                    const rec = this.ensureStudentQuranRecord(cls, st.id);
                    const plan = rec.nextPlan || {};
                    const surah = e?.surahName || '';
                    const hint = kind === 'new' ? `${plan.newSurah} ${plan.newFrom}-${plan.newTo}` : `${plan.revSurah} ${plan.revFrom}-${plan.revTo}`;
                    const p = `s_${st.id}_${kind}`;
                    return `
                        <fieldset class="rec-box ${kind}">
                            <legend>${kind === 'new' ? 'التسميع الجديد' : 'المراجعة'}</legend>
                            <select id="${p}_surah" aria-label="السورة" class="${field}" onchange="app.onSessionSurah('${p}')">
                                <option value="">— لم يُسمِّع — (المقترح: ${esc(hint)})</option>
                                ${this.surahOptionsHtml(surah)}
                            </select>
                            <div class="grid grid-cols-3 gap-1.5 mt-1.5">
                                <input id="${p}_from" type="number" min="1" aria-label="من الآية" placeholder="من" value="${e?.fromAyah ?? ''}" class="${field} text-center">
                                <input id="${p}_to" type="number" min="1" aria-label="إلى الآية" placeholder="إلى" value="${e?.toAyah ?? ''}" class="${field} text-center">
                                <input id="${p}_err" type="number" min="0" aria-label="الأخطاء" placeholder="أخطاء" value="${e?.errors ?? ''}" class="${field} text-center">
                            </div>
                            <select id="${p}_rating" aria-label="التقييم" class="${field} mt-1.5">
                                ${ratings.map(r => `<option value="${r}" ${(e?.rating || 'جيد جداً') === r ? 'selected' : ''}>${r}</option>`).join('')}
                            </select>
                            <button type="button" onclick="app.fillSuggested('${p}', '${st.id}', '${kind}')" class="mt-1.5 text-[11px] font-bold text-indigo-700 underline">استخدام المقترح</button>
                        </fieldset>
                    `;
                };

                container.innerHTML = `
                    <div class="animate-pop space-y-3">
                        ${header}
                        <div class="flex flex-wrap gap-2">
                            ${types.slice(0, 2).map(t => `<button type="button" onclick="app.sessionMarkAll('${t.id}')" class="tool-btn"><span>${esc(t.label)} للجميع</span></button>`).join('')}
                        </div>
                        <div>
                            <label for="sessNotes" class="block text-xs font-bold text-slate-700 mb-1">ملاحظات عامة عن الحصة</label>
                            <textarea id="sessNotes" rows="2" class="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm">${esc(notes)}</textarea>
                        </div>
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            ${cls.students.map(st => {
                                const beh = behaviorOf(st.id)[0];
                                return `
                                    <div class="rec-card">
                                        <div class="flex items-center gap-2 mb-2">
                                            <div class="rec-photo">${this.photoHtml(st)}</div>
                                            <strong class="flex-1 min-w-0 truncate text-slate-900">${esc(st.name)}</strong>
                                            <select id="s_${st.id}_att" aria-label="الحضور" class="${field} w-32 att-select">
                                                <option value="">لم يُرصد</option>
                                                ${types.map(t => `<option value="${t.id}" ${day[st.id] === t.id ? 'selected' : ''}>${esc(t.label)}</option>`).join('')}
                                            </select>
                                        </div>
                                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            ${quranFields(st, 'new', this.sessionEntry(cls, st.id, key, 'new'))}
                                            ${quranFields(st, 'revision', this.sessionEntry(cls, st.id, key, 'revision'))}
                                        </div>
                                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                            <select id="s_${st.id}_beh" aria-label="السلوك" class="${field}">
                                                <option value="">السلوك: —</option>
                                                ${this.behaviorTypes().map(b => `<option value="${b.id}" ${beh?.badgeId === b.id ? 'selected' : ''}>${esc(b.label)} (${b.points > 0 ? '+' : ''}${b.points})</option>`).join('')}
                                            </select>
                                            <input id="s_${st.id}_note" type="text" aria-label="ملاحظة المعلم" placeholder="ملاحظة المعلم على الطالب" value="${esc(studentNotes[st.id] || '')}" class="${field} font-normal">
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        <div class="sticky-save">
                            <button onclick="app.saveSessionRecord()" class="w-full py-3 rounded-xl bg-indigo-600 text-white font-extrabold"><i class="fa-solid fa-floppy-disk ml-1"></i> حفظ سجل الحصة</button>
                        </div>
                    </div>
                `;
            },

            onSessionSurah(prefix) {
                const sel = document.getElementById(`${prefix}_surah`);
                const surah = surahByName(sel.value);
                const from = document.getElementById(`${prefix}_from`);
                const to = document.getElementById(`${prefix}_to`);
                if (!surah) return;
                if (!from.value) from.value = 1;
                if (!to.value || Number(to.value) > surah.ayahs) to.value = surah.ayahs;
                to.max = surah.ayahs;
                from.max = surah.ayahs;
            },

            fillSuggested(prefix, stId, kind) {
                const plan = this.ensureStudentQuranRecord(this.getActiveClass(), stId).nextPlan;
                const isNew = kind === 'new';
                document.getElementById(`${prefix}_surah`).value = isNew ? plan.newSurah : plan.revSurah;
                document.getElementById(`${prefix}_from`).value = isNew ? plan.newFrom : plan.revFrom;
                document.getElementById(`${prefix}_to`).value = isNew ? plan.newTo : plan.revTo;
            },

            sessionMarkAll(typeId) {
                document.querySelectorAll('.att-select').forEach(sel => { sel.value = typeId; });
            },

            /** Applies one recitation to the student's surah map and next plan, as the student page does. */
            applyQuranProgress(rec, surah, entry) {
                const isNew = entry.sessionType === 'new';
                const repeat = entry.rating === 'يحتاج إعادة';
                if (isNew) {
                    if (entry.toAyah >= surah.ayahs && !repeat) rec.surahStatus[surah.num] = entry.rating === 'ممتاز متقن' ? 'mastered' : 'memorized';
                    else if (!['memorized', 'mastered'].includes(rec.surahStatus[surah.num])) rec.surahStatus[surah.num] = 'in_progress';
                } else if (entry.rating === 'ممتاز متقن' && entry.toAyah >= surah.ayahs) {
                    rec.surahStatus[surah.num] = 'mastered';
                }
                const plan = repeat ? { surah, from: entry.fromAyah, to: entry.toAyah } : this.planNextSession(rec, surah, entry.fromAyah, entry.toAyah, isNew);
                if (isNew) Object.assign(rec.nextPlan, { newSurah: plan.surah.name, newFrom: plan.from, newTo: plan.to });
                else Object.assign(rec.nextPlan, { revSurah: plan.surah.name, revFrom: plan.from, revTo: plan.to });
            },

            saveSessionRecord() {
                const cls = this.getActiveClass();
                const key = this.activeSessionKey;
                const date = key.split('~')[0];
                const value = id => document.getElementById(id)?.value.trim() || '';
                const entries = [];
                // Validate everything first, so nothing is half saved.
                for (const st of cls.students) {
                    for (const kind of ['new', 'revision']) {
                        const p = `s_${st.id}_${kind}`;
                        const surahName = value(`${p}_surah`);
                        if (!surahName) {
                            entries.push({ st, kind, remove: true });
                            continue;
                        }
                        const surah = surahByName(surahName);
                        const from = Number(value(`${p}_from`)) || 1;
                        const to = Number(value(`${p}_to`)) || surah.ayahs;
                        if (from < 1 || to > surah.ayahs || from > to) {
                            this.showToast(`${st.name}: آيات سورة ${surah.name} من 1 إلى ${surah.ayahs}`, 'error');
                            document.getElementById(`${p}_from`)?.focus();
                            return;
                        }
                        entries.push({ st, kind, surah, from, to, errors: Math.max(0, Number(value(`${p}_err`)) || 0), rating: value(`${p}_rating`) });
                    }
                }

                const att = { ...((cls.attendance || {})[key] || {}) };
                cls.students.forEach(st => {
                    const status = value(`s_${st.id}_att`);
                    if (status) att[st.id] = status;
                    else delete att[st.id];
                });
                if (!cls.attendance) cls.attendance = {};
                if (Object.keys(att).length) cls.attendance[key] = att;
                else delete cls.attendance[key];

                entries.forEach(e => {
                    const rec = this.ensureStudentQuranRecord(cls, e.st.id);
                    const existing = this.sessionEntry(cls, e.st.id, key, e.kind);
                    if (e.remove) {
                        if (existing) rec.logs = rec.logs.filter(l => l !== existing);
                        return;
                    }
                    const entry = {
                        id: existing?.id || `qlog_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
                        date,
                        lessonKey: key,
                        sessionType: e.kind,
                        surahName: e.surah.name,
                        fromAyah: e.from,
                        toAyah: e.to,
                        errors: e.errors,
                        tajweedNotes: existing?.tajweedNotes || '',
                        rating: e.rating
                    };
                    const changed = !existing || existing.surahName !== entry.surahName || existing.fromAyah !== entry.fromAyah || existing.toAyah !== entry.toAyah || existing.rating !== entry.rating;
                    if (existing) Object.assign(existing, entry);
                    else rec.logs.unshift(entry);
                    if (changed) this.applyQuranProgress(rec, e.surah, entry);
                });

                cls.lessonStudentNotes = cls.lessonStudentNotes || {};
                const notesForKey = {};
                cls.students.forEach(st => {
                    const note = value(`s_${st.id}_note`);
                    if (note) notesForKey[st.id] = note.slice(0, 500);

                    const chosen = value(`s_${st.id}_beh`);
                    const old = (cls.behaviorLogs || []).find(l => l.studentId === st.id && l.lessonKey === key);
                    const type = this.behaviorTypes().find(b => b.id === chosen);
                    if (!type) {
                        if (old) cls.behaviorLogs = cls.behaviorLogs.filter(l => l !== old);
                        return;
                    }
                    const log = { id: old?.id || `beh_${Date.now()}_${st.id}`, studentId: st.id, badgeId: type.id, label: type.label, points: type.points, type: type.type, date, note: '', lessonKey: key };
                    if (old) Object.assign(old, log);
                    else (cls.behaviorLogs = cls.behaviorLogs || []).push(log);
                });
                if (Object.keys(notesForKey).length) cls.lessonStudentNotes[key] = notesForKey;
                else delete cls.lessonStudentNotes[key];

                cls.lessonNotes = cls.lessonNotes || {};
                const general = value('sessNotes');
                if (general) cls.lessonNotes[key] = general.slice(0, 2000);
                else delete cls.lessonNotes[key];

                this.saveData();
                this.sessionEdit = false;
                this.renderClassWorkspace();
                sfx.play('positive');
                this.showToast('تم حفظ سجل الحصة');
            },

            /* ==========================================
               CIRCLE HOME: SEATS OR LIST, AND MANAGEMENT BUTTONS
               ========================================== */
            renderCircleHome(cls, container) {
                const next = this.sessionBuckets(cls).upcoming.find(o => !o.cancelled);
                const listMode = this.circleView === 'list';
                container.innerHTML = `
                    <div class="circle-actions no-print">
                        <button onclick="app.startRecite()" class="tool-btn active recite-start"><i class="fa-solid fa-book-open"></i><span>بدء جلسة التسميع</span></button>
                        <button onclick="app.openClassModal('${cls.id}')" class="tool-btn"><i class="fa-solid fa-gear"></i><span>إعدادات الحلقة</span></button>
                        <button onclick="app.openStudentModal()" class="tool-btn"><i class="fa-solid fa-user-plus"></i><span>إضافة طالب</span></button>
                        <button onclick="app.openBulkStudentsModal()" class="tool-btn"><i class="fa-solid fa-users"></i><span>إضافة عدة طلاب</span></button>
                        <button onclick="app.openImportModal()" class="tool-btn"><i class="fa-solid fa-file-excel"></i><span>استيراد من Excel</span></button>
                    </div>
                    <div class="circle-subbar no-print">
                        <div class="view-switch" role="group" aria-label="طريقة العرض">
                            <button onclick="app.setCircleView('seats')" aria-pressed="${!listMode}" class="${listMode ? '' : 'active'}"><i class="fa-solid fa-chair"></i><span>المقاعد</span></button>
                            <button onclick="app.setCircleView('list')" aria-pressed="${listMode}" class="${listMode ? 'active' : ''}"><i class="fa-solid fa-list"></i><span>قائمة الطلاب</span></button>
                        </div>
                        <button onclick="app.activeTab = 'sessions'; app.sessionsFilter = 'upcoming'; app.animateNext = true; app.renderClassWorkspace();" class="next-chip">
                            <i class="fa-regular fa-clock"></i>
                            ${next ? `الحصة القادمة: ${weekdayName(next.date)} ${fmtDate(next.date)} • <span dir="ltr">${esc(next.start)}</span>` : 'لا حصص قادمة • حدد الجدول'}
                        </button>
                    </div>
                    <div id="circleBody"></div>
                `;
                const body = container.querySelector('#circleBody');
                if (listMode) {
                    this.renderRosterTab(cls, body);
                    this.renderArchivedStudents(cls, body);
                } else {
                    this.renderSeatingTab(cls, body);
                }
            },

            setCircleView(mode) {
                this.circleView = mode;
                this.rearrangeMode = false;
                this.animateNext = true;
                this.renderClassWorkspace();
            },

            /* ==========================================
               STUDENT FILE
               ========================================== */
            openStudentFile(studentId) {
                this.activeTab = 'quran';
                this.activeQuranStudentId = studentId;
                this.animateNext = true;
                this.renderClassWorkspace();
                window.scrollTo({ top: 0 });
            },

            closeStudentFile() {
                this.activeQuranStudentId = null;
                this.activeTab = 'seating';
                this.animateNext = true;
                this.renderClassWorkspace();
            },

            studentFileCardHtml(cls, st) {
                const att = this.getStudentAttendanceStats(cls, st.id);
                const beh = this.getStudentBehaviorStats(cls, st.id);
                const grd = this.getStudentGradeStats(cls, st.id);
                const qur = this.getStudentQuranStats(cls, st.id);
                const logs = [...beh.logs].reverse().slice(0, 6);
                const tile = (label, value, sub = '') => `<div class="file-tile"><div class="v">${value}</div><div class="l">${label}</div>${sub ? `<div class="s">${sub}</div>` : ''}</div>`;
                return `
                    <div class="student-file no-print">
                        <div class="flex flex-wrap items-center gap-3">
                            <div class="file-photo">${this.photoHtml(st)}</div>
                            <div class="flex-1 min-w-0">
                                <h2 class="text-xl font-extrabold text-slate-900 truncate">${esc(st.name)}</h2>
                                <p class="text-xs text-slate-500">${esc(cls.name)}${st.studentNumber ? ` • رقم ${esc(st.studentNumber)}` : ''}</p>
                            </div>
                            <div class="flex flex-wrap gap-2">
                                <button onclick="app.startRecite('${st.id}')" class="tool-btn active recite-start"><i class="fa-solid fa-book-open"></i><span>بدء جلسة التسميع</span></button>
                                <button onclick="app.openStudentModal('${st.id}')" class="tool-btn"><i class="fa-solid fa-pen"></i><span>تعديل البيانات والصورة</span></button>
                                <button onclick="app.openTransferModal('${st.id}')" class="tool-btn"><i class="fa-solid fa-right-left"></i><span>نقل إلى حلقة أخرى</span></button>
                                <button onclick="app.confirmDeleteStudent('${st.id}')" class="tool-btn danger"><i class="fa-solid fa-trash"></i><span>حذف أو أرشفة</span></button>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                            ${tile('القرآن المحفوظ', `${qur.quranPct}%`, `${qur.totalCompleted} سورة • ${qur.memorizedAyahs} آية`)}
                            ${tile('الحضور', fmtPct(att.rate), `حضر ${att.present} • غاب ${att.absent}`)}
                            ${tile('السلوك', beh.net > 0 ? `+${beh.net}` : beh.net, `${beh.positive} إيجابي • ${beh.negative} سلبي`)}
                            ${tile('الاختبارات', fmtPct(grd.pct), esc(grd.label))}
                        </div>
                        <div class="mt-3">${this.studentDetailsHtml(st) || '<p class="text-xs text-slate-500">لا توجد بيانات إضافية. اضغط «تعديل البيانات» لإضافتها.</p>'}</div>
                        ${logs.length ? `
                            <div class="mt-1 text-xs">
                                <b class="text-slate-700">آخر السلوك:</b>
                                ${logs.map(l => `<span class="${l.points > 0 ? 'text-emerald-700' : 'text-rose-600'} font-bold">${esc(l.label)}</span> <span class="text-slate-500">(${fmtDate(l.date)})</span>`).join('، ')}
                            </div>
                        ` : ''}
                    </div>
                `;
            },

            openTransferModal(studentId) {
                const cls = this.getActiveClass();
                const st = cls.students.find(s => s.id === studentId);
                const targets = this.activeClasses().filter(c => c.id !== cls.id);
                if (!targets.length) {
                    this.showToast('لا توجد حلقة أخرى للنقل إليها', 'error');
                    return;
                }
                this.openModal('نقل طالب إلى حلقة أخرى', `
                    <form onsubmit="event.preventDefault(); app.transferStudent('${studentId}');" class="space-y-3">
                        <p class="text-sm text-slate-600">سيُنقل <b>${esc(st.name)}</b> مع سجل حفظه ومراجعته وحضوره وسلوكه. تبقى نسخة من ملفه في أرشيف هذه الحلقة.</p>
                        <select id="transferTarget" class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold">
                            ${targets.map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join('')}
                        </select>
                        <div class="flex justify-end gap-2">
                            <button type="button" onclick="app.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">تراجع</button>
                            <button type="submit" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">نقل الطالب</button>
                        </div>
                    </form>
                `);
            },

            /** Moves the student and the history that belongs to them, and leaves an archived copy here. */
            transferStudent(studentId) {
                const source = this.getActiveClass();
                const target = this.data.classes.find(c => c.id === document.getElementById('transferTarget').value);
                const st = source.students.find(s => s.id === studentId);
                if (!target || !st) return;

                const moved = JSON.parse(JSON.stringify(st));
                moved.seatIndex = this.nextFreeSeat(target);
                target.students.push(moved);
                if (source.quranRecords?.[studentId]) {
                    target.quranRecords = target.quranRecords || {};
                    target.quranRecords[studentId] = JSON.parse(JSON.stringify(source.quranRecords[studentId]));
                }
                target.attendance = target.attendance || {};
                Object.entries(source.attendance || {}).forEach(([key, day]) => {
                    if (!day?.[studentId]) return;
                    target.attendance[key] = { ...(target.attendance[key] || {}), [studentId]: day[studentId] };
                });
                target.behaviorLogs = [...(target.behaviorLogs || []), ...(source.behaviorLogs || []).filter(l => l.studentId === studentId).map(l => ({ ...l }))];

                source.students = source.students.filter(s => s.id !== studentId);
                source.archivedStudents = [...(source.archivedStudents || []), { ...st, notes: `${st.notes ? `${st.notes} • ` : ''}نُقل إلى ${target.name}` }];

                this.saveData();
                this.closeModal();
                this.closeStudentFile();
                this.showToast(`نُقل الطالب إلى ${target.name} مع سجله`);
            },

            /* ==========================================
               TRASH FOR CIRCLES
               ========================================== */
            confirmTrashClass(classId) {
                const cls = this.data.classes.find(c => c.id === classId);
                if (!cls) return;
                this.openModal('نقل الحلقة إلى سلة المهملات', `
                    <div class="space-y-4">
                        <p class="text-sm text-slate-600">ستُنقل <b>${esc(cls.name)}</b> إلى سلة المهملات مع طلابها وكل سجلاتها، ويمكنك استعادتها في أي وقت من «سلة المهملات».</p>
                        <div class="flex justify-end gap-2">
                            <button onclick="app.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">تراجع</button>
                            <button onclick="app.trashClass('${classId}')" class="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold">نعم، انقلها إلى السلة</button>
                        </div>
                    </div>
                `);
            },

            trashClass(classId) {
                const cls = this.data.classes.find(c => c.id === classId);
                if (!cls) return;
                cls.deletedAt = new Date().toISOString();
                this.saveData();
                this.closeModal();
                this.showDashboard();
                this.showToast('نُقلت الحلقة إلى سلة المهملات');
            },

            restoreFromTrash(classId) {
                const cls = this.data.classes.find(c => c.id === classId);
                if (!cls) return;
                cls.deletedAt = '';
                this.saveData();
                this.openTrashModal();
                this.renderDashboard();
                this.showToast('استُعيدت الحلقة');
            },

            openTrashModal() {
                const trashed = this.data.classes.filter(c => c.deletedAt);
                this.openModal('🗑 سلة المهملات', trashed.length ? `
                    <div class="space-y-2">
                        ${trashed.map(c => `
                            <div class="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                                <div class="min-w-0">
                                    <div class="text-sm font-bold text-slate-800 truncate">${esc(c.name)}</div>
                                    <div class="text-[11px] text-slate-500">${c.students.length} طالب • حُذفت ${fmtDate(c.deletedAt.slice(0, 10))}</div>
                                </div>
                                <div class="flex gap-2 shrink-0">
                                    <button onclick="app.restoreFromTrash('${c.id}')" class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold">استعادة</button>
                                    <button onclick="app.confirmDeleteClass('${c.id}')" class="px-3 py-1.5 rounded-lg bg-white border border-rose-300 text-rose-700 text-xs font-bold">حذف نهائي</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p class="text-sm text-slate-500">سلة المهملات فارغة.</p>');
            },

            /* ==========================================
               IMPORT STUDENTS FROM EXCEL (XLSX) OR CSV WITH PREVIEW
               ========================================== */
            openImportModal() {
                this.openModal('استيراد الطلاب من Excel', `
                    <div class="space-y-3 text-sm text-slate-700">
                        <p>اختر ملف Excel بصيغة <b dir="ltr">.xlsx</b> أو ملف <b dir="ltr">.csv</b>. ستظهر معاينة للأسماء قبل الإضافة، ويمكنك اختيار العمود المناسب لكل حقل.</p>
                        <label class="block p-6 rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50 text-center cursor-pointer">
                            <i class="fa-solid fa-file-excel text-3xl text-emerald-600"></i>
                            <div class="font-bold mt-2">اضغط لاختيار الملف</div>
                            <input type="file" accept=".xlsx,.csv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onchange="app.onImportFile(event)" class="hidden">
                        </label>
                        <p class="text-xs text-slate-500">يُقرأ الملف داخل جهازك فقط، ولا يُرسل إلى أي مكان.</p>
                    </div>
                `);
            },

            async onImportFile(event) {
                const file = event.target.files?.[0];
                event.target.value = '';
                if (!file) return;
                try {
                    const rows = /\.xlsx$/i.test(file.name) ? await readXlsxRows(await file.arrayBuffer()) : this.parseCsv((await file.text()).replace(/^﻿/, ''));
                    if (!rows.length) {
                        this.showToast('الملف فارغ', 'error');
                        return;
                    }
                    const width = Math.max(...rows.map(r => r.length));
                    this.importState = { rows: rows.map(r => Array.from({ length: width }, (_, i) => String(r[i] ?? '').trim())), header: true, skipDuplicates: true, map: {} };
                    this.autoMapImport();
                    this.renderImportPreview();
                } catch (e) {
                    console.error(e);
                    this.showToast(e.message === 'no-decompress' ? 'المتصفح لا يقرأ ملفات xlsx؛ احفظ الملف من Excel بصيغة CSV وأعد المحاولة' : 'تعذر قراءة الملف؛ تأكد أنه ملف Excel سليم', 'error');
                }
            },

            autoMapImport() {
                const s = this.importState;
                const head = s.rows[0].map(h => h.toLowerCase());
                const find = words => head.findIndex(h => h && words.some(w => h.includes(w)));
                s.map = {};
                IMPORT_FIELDS.forEach(f => {
                    const i = find(f.words);
                    if (i !== -1 && !Object.values(s.map).includes(i)) s.map[f.key] = i;
                });
                if (s.map.name === undefined) {
                    s.header = false;
                    s.map.name = 0;
                }
            },

            /** Rows ready to add, each with its problems listed. */
            importCandidates() {
                const s = this.importState;
                const cls = this.getActiveClass();
                const existing = new Set(cls.students.map(st => normalizeName(st.name)));
                const seen = new Set();
                return s.rows.slice(s.header ? 1 : 0).map((r, i) => {
                    const get = key => (s.map[key] !== undefined && s.map[key] !== '' ? r[s.map[key]] || '' : '');
                    const record = { name: get('name').slice(0, 200) };
                    const issues = [];
                    IMPORT_FIELDS.filter(f => f.key !== 'name').forEach(f => { record[f.key] = get(f.key); });
                    if (!record.name) issues.push('اسم فارغ');
                    const norm = normalizeName(record.name);
                    let duplicate = false;
                    if (record.name && (existing.has(norm) || seen.has(norm))) {
                        duplicate = true;
                        issues.push(existing.has(norm) ? 'موجود في الحلقة' : 'مكرر في الملف');
                    }
                    seen.add(norm);
                    ['email', 'parentEmail'].forEach(k => {
                        if (record[k] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record[k])) {
                            issues.push('بريد غير صحيح');
                            record[k] = '';
                        }
                    });
                    if (record.birthDate) {
                        const iso = /^\d+(\.\d+)?$/.test(record.birthDate) ? excelSerialToIso(Number(record.birthDate)) : parseDMY(record.birthDate);
                        if (!iso) issues.push('تاريخ غير صحيح');
                        record.birthDate = iso || '';
                    }
                    if (record.gender) record.gender = /^(ذ|m|ولد)/i.test(record.gender) ? 'ذكر' : (/^(أ|ا|f|بنت)/i.test(record.gender) ? 'أنثى' : '');
                    return { line: i + 1 + (s.header ? 1 : 0), record, issues, duplicate, invalid: !record.name };
                });
            },

            renderImportPreview() {
                const s = this.importState;
                const width = s.rows[0].length;
                const columnLabel = i => (s.header ? s.rows[0][i] || `العمود ${i + 1}` : `العمود ${i + 1}`);
                const list = this.importCandidates();
                const ready = list.filter(c => !c.invalid && !(c.duplicate && s.skipDuplicates));
                const shown = IMPORT_FIELDS.filter(f => f.key === 'name' || (s.map[f.key] !== undefined && s.map[f.key] !== ''));
                this.openModal('معاينة الاستيراد', `
                    <div class="space-y-3 text-sm">
                        <label class="flex items-center gap-2 font-bold text-slate-700"><input type="checkbox" ${s.header ? 'checked' : ''} onchange="app.importState.header = this.checked; app.renderImportPreview();"> الصف الأول عناوين أعمدة</label>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            ${IMPORT_FIELDS.map(f => `
                                <label class="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2">
                                    <span class="text-xs font-bold text-slate-700 w-28 shrink-0">${f.label}${f.key === 'name' ? ' *' : ''}</span>
                                    <select onchange="app.importState.map['${f.key}'] = this.value === '' ? '' : Number(this.value); app.renderImportPreview();" class="flex-1 min-w-0 px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs">
                                        <option value="">— لا شيء —</option>
                                        ${Array.from({ length: width }, (_, i) => `<option value="${i}" ${s.map[f.key] === i ? 'selected' : ''}>${esc(columnLabel(i))}</option>`).join('')}
                                    </select>
                                </label>
                            `).join('')}
                        </div>
                        <label class="flex items-center gap-2 font-bold text-slate-700"><input type="checkbox" ${s.skipDuplicates ? 'checked' : ''} onchange="app.importState.skipDuplicates = this.checked; app.renderImportPreview();"> تخطي الأسماء المكررة</label>
                        <div class="overflow-x-auto max-h-72 border border-slate-200 rounded-xl">
                            <table class="w-full text-xs text-right import-table">
                                <thead><tr><th>#</th>${shown.map(f => `<th>${f.label}</th>`).join('')}<th>الحالة</th></tr></thead>
                                <tbody>
                                    ${list.slice(0, 200).map(c => `
                                        <tr class="${c.invalid ? 'bad' : (c.duplicate ? 'dup' : (c.issues.length ? 'warn' : ''))}">
                                            <td>${c.line}</td>
                                            ${shown.map(f => `<td>${esc(f.key === 'birthDate' ? fmtDate(c.record[f.key]) : c.record[f.key])}</td>`).join('')}
                                            <td>${c.issues.length ? esc(c.issues.join('، ')) : 'سليم'}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <span class="text-xs font-bold text-slate-600">سيُضاف ${ready.length} من ${list.length} • مكرر ${list.filter(c => c.duplicate).length} • غير صالح ${list.filter(c => c.invalid).length}</span>
                            <button onclick="app.confirmImport()" ${ready.length ? '' : 'disabled'} class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold disabled:opacity-50">إضافة ${ready.length} طالب</button>
                        </div>
                    </div>
                `);
            },

            confirmImport() {
                const cls = this.getActiveClass();
                const ready = this.importCandidates().filter(c => !c.invalid && !(c.duplicate && this.importState.skipDuplicates));
                const stamp = Date.now();
                ready.forEach((c, i) => {
                    cls.students.push({
                        ...c.record,
                        id: `stu_${stamp}_${i}`,
                        notes: c.record.notes || '',
                        custom: {},
                        avatarColor: AVATAR_COLORS[cls.students.length % AVATAR_COLORS.length],
                        seatIndex: this.nextFreeSeat(cls)
                    });
                });
                this.data = sanitizeData(this.data);
                this.saveData();
                this.importState = null;
                this.closeModal();
                this.renderClassWorkspace();
                this.showToast(`تمت إضافة ${ready.length} طالب`);
            },

            /* ==========================================
               CIRCLE SETTINGS: SCHEDULE TYPE
               ========================================== */
            scheduleEditorHtml(cls) {
                const plan = this.planDraft;
                const m = plan.monthly;
                const weeks = [[1, 'الأول'], [2, 'الثاني'], [3, 'الثالث'], [4, 'الرابع'], [-1, 'الأخير']];
                return `
                    <div id="scheduleEditor" class="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <span class="text-sm font-extrabold text-slate-800">الجدول</span>
                            <div class="view-switch" role="group" aria-label="نوع الجدول">
                                <button type="button" onclick="app.setPlanType('weekly')" aria-pressed="${plan.type === 'weekly'}" class="${plan.type === 'weekly' ? 'active' : ''}">أسبوعي</button>
                                <button type="button" onclick="app.setPlanType('monthly')" aria-pressed="${plan.type === 'monthly'}" class="${plan.type === 'monthly' ? 'active' : ''}">شهري</button>
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">تاريخ بداية الجدول</label>
                            ${this.dateInputHtml('planStartInput', plan.startDate)}
                        </div>
                        ${plan.type === 'weekly' ? `
                            <div class="flex items-center justify-between gap-2">
                                <span class="text-xs font-bold text-slate-700">الأيام والمواعيد (يوم واحد أو أكثر)</span>
                                <button type="button" onclick="app.addSessionDraft()" class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold">+ إضافة يوم</button>
                            </div>
                            <div id="sessionRows" class="space-y-2">${this.sessionRowsHtml()}</div>
                        ` : `
                            <div class="view-switch" role="group" aria-label="نمط الجدول الشهري">
                                <button type="button" onclick="app.setMonthlyMode('dates')" class="${m.mode === 'dates' ? 'active' : ''}">أيام محددة من الشهر</button>
                                <button type="button" onclick="app.setMonthlyMode('weekday')" class="${m.mode === 'weekday' ? 'active' : ''}">يوم من الأسبوع يتكرر</button>
                            </div>
                            ${m.mode === 'dates' ? `
                                <div>
                                    <label for="monthDaysInput" class="block text-xs font-bold text-slate-700 mb-1">أيام الشهر (افصل بينها بفاصلة)</label>
                                    <input type="text" id="monthDaysInput" dir="ltr" onchange="app.capturePlanDraft(); app.refreshScheduleEditor();" value="${m.days.join(', ')}" placeholder="1, 15" class="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm">
                                </div>
                            ` : `
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <select id="monthWeekdayInput" aria-label="اليوم" class="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold">
                                        ${WEEK_DAYS.map((d, i) => `<option value="${i}" ${m.weekday === i ? 'selected' : ''}>${d}</option>`).join('')}
                                    </select>
                                    <div class="flex flex-wrap gap-2 items-center">
                                        ${weeks.map(([w, l]) => `<label class="flex items-center gap-1 text-xs font-bold"><input type="checkbox" name="monthWeeks" value="${w}" ${m.weeks.includes(w) ? 'checked' : ''} onchange="app.capturePlanDraft(); app.refreshScheduleEditor();"> ${l}</label>`).join('')}
                                    </div>
                                </div>
                            `}
                            <div class="grid grid-cols-2 gap-2">
                                <div><label for="monthStart" class="block text-xs font-bold text-slate-700 mb-1">البداية</label><input type="time" id="monthStart" dir="ltr" value="${esc(m.start)}" class="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"></div>
                                <div><label for="monthEnd" class="block text-xs font-bold text-slate-700 mb-1">النهاية</label><input type="time" id="monthEnd" dir="ltr" value="${esc(m.end)}" class="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"></div>
                            </div>
                            <p class="text-xs font-bold text-indigo-700">عدد الحصص في الشهر: ${m.mode === 'dates' ? m.days.length : m.weeks.length}</p>
                        `}
                        <p class="text-[11px] text-slate-500">تعديل الجدول يغيّر الحصص القادمة فقط، ولا يمس سجلات الحصص السابقة.</p>
                    </div>
                `;
            },

            /** Reads the schedule part of the circle form into the draft. */
            capturePlanDraft() {
                const plan = this.planDraft;
                const start = document.getElementById('planStartInput');
                if (start) plan.startDate = parseDMY(start.value) || (start.value.trim() ? plan.startDate : '');
                if (plan.type === 'monthly') {
                    const m = plan.monthly;
                    const daysInput = document.getElementById('monthDaysInput');
                    if (daysInput) m.days = [...new Set(daysInput.value.split(/[,،\s]+/).map(Number).filter(d => d >= 1 && d <= 31))].sort((a, b) => a - b);
                    const weekday = document.getElementById('monthWeekdayInput');
                    if (weekday) m.weekday = Number(weekday.value);
                    const weeks = [...document.querySelectorAll('input[name="monthWeeks"]')];
                    if (weeks.length) m.weeks = weeks.filter(w => w.checked).map(w => Number(w.value));
                    m.start = document.getElementById('monthStart')?.value || m.start;
                    m.end = document.getElementById('monthEnd')?.value || m.end;
                }
            },

            refreshScheduleEditor() {
                const box = document.getElementById('scheduleEditor');
                if (box) box.outerHTML = this.scheduleEditorHtml();
            },

            setPlanType(type) {
                this.capturePlanDraft();
                this.planDraft.type = type;
                this.refreshScheduleEditor();
            },

            setMonthlyMode(mode) {
                this.capturePlanDraft();
                this.planDraft.monthly.mode = mode;
                this.refreshScheduleEditor();
            },

            /* ==========================================
               TEACHER ACCOUNT (OPTIONAL): GOOGLE SIGN-IN AND PRIVATE CLOUD COPY
               ========================================== */
            accountReady() {
                return Boolean(window.MoallemAccount);
            },

            initAccount() {
                const stored = localStorage.getItem(this.ACCOUNT_REV_KEY);
                this.accountRevision = stored === null ? null : Number(stored);
                if (!this.accountReady()) return;
                window.MoallemAccount.onChange(user => this.onAccountChange(user));
                document.addEventListener('visibilitychange', () => {
                    if (document.visibilityState === 'visible' && this.account) this.accountPull();
                });
            },

            async onAccountChange(user) {
                const previous = this.account;
                this.account = user;
                this.updateAccountButton();
                if (!user) {
                    if (previous) this.showToast('تم تسجيل الخروج، وبياناتك على هذا الجهاز كما هي', 'info');
                    return;
                }
                const lastUid = localStorage.getItem(this.ACCOUNT_UID_KEY);
                if (lastUid !== user.uid) {
                    // Another teacher on this device: keep a copy of what was here and start fresh for this account.
                    if (lastUid) {
                        // The data here belongs to the previous teacher: keep a copy and start this teacher from their own file.
                        this.saveSnapshot('قبل التبديل إلى حساب آخر');
                        this.data = sanitizeData({ classes: [], settings: this.data.settings });
                        this.saveData(true);
                        localStorage.removeItem(this.ACCOUNT_DIRTY_KEY);
                        this.refreshCurrentView();
                    }
                    this.accountRevision = null;
                    localStorage.removeItem(this.ACCOUNT_REV_KEY);
                    localStorage.setItem(this.ACCOUNT_UID_KEY, user.uid);
                }
                await this.accountPull(true);
            },

            setAccountStatus(status, error = '') {
                this.accountStatus = status;
                this.accountError = error;
                this.updateAccountButton();
                const line = document.getElementById('accountStatusLine');
                if (line) line.textContent = this.accountStatusText();
            },

            accountStatusText() {
                if (!this.account) return 'غير مسجّل: بياناتك محفوظة في هذا الجهاز فقط';
                const last = localStorage.getItem(this.ACCOUNT_LAST_KEY);
                switch (this.accountStatus) {
                    case 'syncing': return 'جاري المزامنة مع حسابك...';
                    case 'conflict': return 'المزامنة متوقفة: حسابك فيه تعديلات من جهاز آخر';
                    case 'error': return `تعذرت المزامنة (${this.accountErrorText(this.accountError)})`;
                    default: return localStorage.getItem(this.ACCOUNT_DIRTY_KEY) === 'true'
                        ? 'توجد تعديلات لم تُرفع بعد'
                        : `محفوظ في حسابك${last ? ` • ${this.formatDateTime(last)}` : ''}`;
                }
            },

            accountErrorText(code) {
                return {
                    'auth/popup-blocked': 'المتصفح منع نافذة تسجيل الدخول؛ اسمح بالنوافذ المنبثقة',
                    'auth/popup-closed-by-user': 'أُغلقت نافذة تسجيل الدخول',
                    'auth/cancelled-popup-request': 'أُلغي تسجيل الدخول',
                    'auth/unauthorized-domain': 'هذا العنوان غير مسموح لتسجيل الدخول؛ افتح التطبيق من رابطه على الإنترنت',
                    'auth/operation-not-supported-in-this-environment': 'افتح التطبيق من رابطه على الإنترنت لتسجيل الدخول',
                    'auth/operation-not-allowed': 'تسجيل الدخول بهذه الطريقة غير مفعّل بعد في إعدادات المشروع',
                    'auth/configuration-not-found': 'تسجيل الدخول بهذه الطريقة غير مفعّل بعد في إعدادات المشروع',
                    'auth/network-request-failed': 'لا يوجد اتصال بالإنترنت',
                    unavailable: 'لا يوجد اتصال بالإنترنت',
                    'permission-denied': 'لا صلاحية للوصول إلى هذه البيانات',
                    incomplete: 'النسخة السحابية غير مكتملة، أعد المحاولة'
                }[code] || 'خطأ غير متوقع';
            },

            updateAccountButton() {
                const btn = document.getElementById('accountBtn');
                if (!btn) return;
                const failing = ['error', 'conflict'].includes(this.accountStatus);
                btn.classList.toggle('signed-in', Boolean(this.account));
                btn.classList.toggle('failing', Boolean(this.account) && failing);
                btn.title = this.account ? `${this.account.name || this.account.email} • ${this.accountStatusText()}` : 'تسجيل الدخول (اختياري)';
                btn.setAttribute('aria-label', btn.title);
                btn.innerHTML = this.account?.photo
                    ? `<img src="${esc(this.account.photo)}" alt="" referrerpolicy="no-referrer">`
                    : `<i class="fa-solid ${this.account ? 'fa-user-check' : 'fa-user'}"></i>`;
            },

            accountSectionHtml() {
                if (!this.accountReady()) {
                    return '<p class="text-xs text-slate-500">تسجيل الدخول غير متاح في هذه النسخة.</p>';
                }
                if (!this.account) {
                    return `
                        <p class="text-xs text-slate-600 leading-relaxed">تسجيل الدخول اختياري. إن سجّلت دخولك صار لك ملف خاص في السحابة تُحفظ فيه حلقاتك وطلابك، فتجدها على هاتفك والآيباد والحاسوب. وإن لم تسجّل تبقى بياناتك في هذا الجهاز وحده.</p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <button onclick="app.accountSignIn('google')" class="signin-btn google"><span class="g-mark" aria-hidden="true">G</span><span>الدخول بحساب Google</span></button>
                            <button disabled class="signin-btn apple" title="سيُفعَّل قريبًا"><i class="fa-brands fa-apple"></i><span>الدخول بحساب Apple (قريبًا)</span></button>
                        </div>
                    `;
                }
                return `
                    <div class="flex items-center gap-3">
                        <div class="account-photo">${this.account.photo ? `<img src="${esc(this.account.photo)}" alt="" referrerpolicy="no-referrer">` : '<i class="fa-solid fa-user"></i>'}</div>
                        <div class="min-w-0 flex-1">
                            <div class="text-sm font-extrabold text-slate-900 truncate">${esc(this.account.name || 'محفّظ')}</div>
                            <div class="text-xs text-slate-500 truncate" dir="ltr">${esc(this.account.email)}</div>
                        </div>
                    </div>
                    <p id="accountStatusLine" class="text-xs font-bold text-slate-700">${esc(this.accountStatusText())}</p>
                    <div class="grid grid-cols-2 gap-2">
                        <button onclick="app.accountSyncNow()" class="p-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"><i class="fa-solid fa-rotate ml-1"></i>مزامنة الآن</button>
                        <button onclick="app.openSignOutModal()" class="p-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold"><i class="fa-solid fa-right-from-bracket ml-1"></i>تسجيل الخروج</button>
                    </div>
                `;
            },

            openAccountModal() {
                this.openModal(this.account ? 'حسابي' : 'تسجيل الدخول', `<div class="space-y-3">${this.accountSectionHtml()}</div>`);
            },

            async accountSignIn(kind) {
                try {
                    this.setAccountStatus('syncing');
                    await window.MoallemAccount.signIn(kind);
                    this.closeModal();
                } catch (e) {
                    this.setAccountStatus('idle');
                    this.showToast(`لم يتم تسجيل الدخول: ${this.accountErrorText(e.code)}`, 'error');
                }
            },

            /** Brings the account copy here, or sends this device's copy up, depending on which changed. */
            async accountPull(firstTime = false) {
                if (!this.account || this.accountBusy) return;
                this.accountBusy = true;
                this.setAccountStatus('syncing');
                try {
                    const cloud = await window.MoallemAccount.read();
                    const localDirty = localStorage.getItem(this.ACCOUNT_DIRTY_KEY) === 'true';
                    if (!cloud.payload) {
                        this.accountBusy = false;
                        await this.accountPush(false, firstTime ? 'تم إنشاء ملفك السحابي ورفع بياناتك إليه' : '');
                        return;
                    }
                    if (cloud.revision === this.accountRevision) {
                        this.accountBusy = false;
                        if (localDirty) await this.accountPush();
                        else this.setAccountStatus('idle');
                        return;
                    }
                    if (localDirty && this.accountRevision !== null) {
                        this.setAccountStatus('conflict');
                        this.openAccountConflictModal(cloud);
                        return;
                    }
                    if (firstTime && this.accountRevision === null && localDirty) {
                        // First sign-in on a device that already has the teacher's own work.
                        this.setAccountStatus('conflict');
                        this.openAccountConflictModal(cloud, true);
                        return;
                    }
                    this.applyAccountCopy(cloud, firstTime);
                } catch (e) {
                    this.setAccountStatus('error', e.code || '');
                } finally {
                    this.accountBusy = false;
                }
            },

            applyAccountCopy(cloud, announce = true) {
                const incoming = sanitizeData(JSON.parse(cloud.payload));
                this.saveSnapshot('قبل تحميل بيانات الحساب');
                this.data = incoming;
                this.saveData(true);
                this.markAccountSynced(cloud.revision, cloud.updatedAt);
                this.refreshCurrentView();
                if (announce) this.showToast('تم تحميل بياناتك من حسابك');
            },

            refreshCurrentView() {
                if (this.activeClassId && this.getActiveClass()) this.renderClassWorkspace();
                else this.showDashboard();
            },

            markAccountSynced(revision, updatedAt) {
                this.accountRevision = revision;
                localStorage.setItem(this.ACCOUNT_REV_KEY, String(revision));
                localStorage.setItem(this.ACCOUNT_LAST_KEY, updatedAt || new Date().toISOString());
                localStorage.removeItem(this.ACCOUNT_DIRTY_KEY);
                this.setAccountStatus('idle');
            },

            scheduleAccountSync() {
                if (!this.account || this.accountStatus === 'conflict') return;
                clearTimeout(this.accountTimer);
                this.accountTimer = setTimeout(() => this.accountPush(), 3000);
            },

            async accountPush(force = false, message = '') {
                if (!this.account) return false;
                if (this.accountBusy) {
                    this.scheduleAccountSync();
                    return false;
                }
                this.accountBusy = true;
                this.setAccountStatus('syncing');
                const sentVersion = this.data.lastUpdated;
                try {
                    const result = await window.MoallemAccount.write(JSON.stringify(this.data), this.accountRevision ?? 0, force, navigator.platform || '');
                    this.markAccountSynced(result.revision, result.updatedAt);
                    if (this.data.lastUpdated !== sentVersion) localStorage.setItem(this.ACCOUNT_DIRTY_KEY, 'true');
                    if (message) this.showToast(message);
                    return true;
                } catch (e) {
                    if (e.code === 'conflict') {
                        this.setAccountStatus('conflict');
                        this.openAccountConflictModal({ revision: e.revision, updatedAt: e.updatedAt });
                    } else {
                        const repeated = this.accountStatus === 'error' && this.accountError === (e.code || '');
                        this.setAccountStatus('error', e.code || '');
                        if (!repeated) this.showToast(`لم تكتمل مزامنة الحساب: ${this.accountErrorText(e.code)}`, 'error');
                    }
                    return false;
                } finally {
                    this.accountBusy = false;
                }
            },

            async accountSyncNow() {
                if (localStorage.getItem(this.ACCOUNT_DIRTY_KEY) === 'true') await this.accountPush(false, 'تم رفع بياناتك إلى حسابك');
                else await this.accountPull();
                const line = document.getElementById('accountStatusLine');
                if (line) line.textContent = this.accountStatusText();
            },

            openAccountConflictModal(cloud, firstTime = false) {
                const when = cloud.updatedAt ? this.formatDateTime(cloud.updatedAt) : 'غير معروف';
                this.pendingAccountCloud = cloud.payload ? cloud : null;
                this.openModal(firstTime ? 'لديك بيانات هنا وفي حسابك' : 'حسابك فيه تعديلات من جهاز آخر', `
                    <div class="space-y-4 text-sm text-slate-700">
                        <p>${firstTime ? 'في هذا الجهاز بيانات، وفي حسابك بيانات أخرى' : 'تغيّرت بيانات حسابك من جهاز آخر'} (آخر تحديث للحساب: ${esc(when)}). اختر أيهما تعتمد؛ ستُحفظ نسخة من الأخرى في «النسخ التلقائية».</p>
                        <div class="grid grid-cols-1 gap-2">
                            <button onclick="app.resolveAccountConflict('cloud')" class="p-3 rounded-xl bg-indigo-600 text-white text-xs font-bold">استخدام بيانات حسابي</button>
                            <button onclick="app.resolveAccountConflict('device')" class="p-3 rounded-xl bg-white border border-rose-300 text-rose-700 text-xs font-bold">اعتماد بيانات هذا الجهاز ورفعها إلى حسابي</button>
                            <button onclick="app.closeModal()" class="p-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">لاحقًا</button>
                        </div>
                    </div>
                `);
            },

            async resolveAccountConflict(choice) {
                this.closeModal();
                if (choice === 'device') {
                    this.accountStatus = 'idle';
                    await this.accountPush(true, 'اعتُمدت بيانات هذا الجهاز ورُفعت إلى حسابك');
                    return;
                }
                try {
                    const cloud = this.pendingAccountCloud || await window.MoallemAccount.read();
                    this.applyAccountCopy(cloud);
                } catch (e) {
                    this.setAccountStatus('error', e.code || '');
                    this.showToast(`تعذر التحميل: ${this.accountErrorText(e.code)}`, 'error');
                }
            },

            openSignOutModal() {
                this.openModal('تسجيل الخروج', `
                    <div class="space-y-4 text-sm text-slate-700">
                        <p>بياناتك محفوظة في حسابك. ماذا تريد أن يبقى على هذا الجهاز بعد الخروج؟</p>
                        <div class="grid grid-cols-1 gap-2">
                            <button onclick="app.accountSignOut(false)" class="p-3 rounded-xl bg-indigo-600 text-white text-xs font-bold">الخروج مع إبقاء البيانات على الجهاز</button>
                            <button onclick="app.accountSignOut(true)" class="p-3 rounded-xl bg-white border border-rose-300 text-rose-700 text-xs font-bold">الخروج ومسح البيانات من هذا الجهاز (جهاز مشترك)</button>
                            <button onclick="app.closeModal()" class="p-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">تراجع</button>
                        </div>
                    </div>
                `);
            },

            async accountSignOut(clearDevice) {
                if (localStorage.getItem(this.ACCOUNT_DIRTY_KEY) === 'true') await this.accountPush();
                await window.MoallemAccount.signOut();
                [this.ACCOUNT_REV_KEY, this.ACCOUNT_LAST_KEY, this.ACCOUNT_DIRTY_KEY, this.ACCOUNT_UID_KEY].forEach(k => localStorage.removeItem(k));
                this.accountRevision = null;
                if (clearDevice) {
                    this.data = sanitizeData({ classes: [], settings: this.data.settings });
                    this.saveData(true);
                    localStorage.removeItem(this.SNAPSHOT_KEY);
                }
                this.closeModal();
                this.showDashboard();
            },

            /* ==========================================
               INTERACTIVE MUSHAF AND RECITATION SESSION
               Text: Tanzil Quran Text (Uthmani, Version 1.1), tanzil.net, CC BY 3.0, used verbatim.
               ========================================== */
            async loadQuran() {
                if (this.quranText) return this.quranText;
                if (!this.quranLoading) {
                    this.quranLoading = (async () => {
                        if (typeof DecompressionStream === 'undefined') throw new Error('no-decompress');
                        const bytes = Uint8Array.from(atob(QURAN_GZ_B64), ch => ch.charCodeAt(0));
                        const text = await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
                        const map = new Map();
                        text.split('\n').forEach(line => {
                            const match = line.match(/^(\d+)\|(\d+)\|(.*)$/);
                            if (!match) return;
                            const sura = Number(match[1]);
                            if (!map.has(sura)) map.set(sura, []);
                            map.get(sura)[Number(match[2]) - 1] = match[3];
                        });
                        this.quranText = map;
                        return map;
                    })();
                }
                return this.quranLoading;
            },

            /** Ayah 1 of most surahs opens with the basmala in the source text; it is shown as a heading. */
            splitBasmala(sura, firstAyah) {
                if (sura === 1 || sura === 9) return { basmala: '', text: firstAyah };
                const words = firstAyah.split(' ');
                return { basmala: words.slice(0, 4).join(' '), text: words.slice(4).join(' ') };
            },

            reciteDefaults(cls, studentId, type) {
                const rec = this.ensureStudentQuranRecord(cls, studentId);
                const plan = rec.nextPlan || {};
                const name = type === 'new' ? plan.newSurah : plan.revSurah;
                const surah = surahByName(name) || ALL_SURAHS[77];
                const from = type === 'new' ? plan.newFrom : plan.revFrom;
                return { surah: surah.num, hint: Math.min(Math.max(1, from || 1), surah.ayahs) };
            },

            startRecite(studentId = null, type = null) {
                const cls = this.getActiveClass();
                if (!cls) return;
                const keep = this.recite || {};
                this.recite = {
                    studentId,
                    type: type || keep.type || 'new',
                    surah: 78,
                    hint: 1,
                    start: null,
                    end: null,
                    mode: 'start',
                    rating: 'جيد جداً',
                    errors: 0,
                    note: '',
                    viewLog: null,
                    fontSize: keep.fontSize || Number(localStorage.getItem('moallemkit_mushaf_size')) || 30,
                    color: keep.color || localStorage.getItem('moallemkit_mushaf_color') || '#e9b949'
                };
                if (studentId) Object.assign(this.recite, this.reciteDefaults(cls, studentId, this.recite.type));
                this.activeTab = 'recite';
                this.animateNext = true;
                this.renderClassWorkspace();
                window.scrollTo({ top: 0 });
            },

            /** Opens a saved recitation on the mushaf with its range highlighted, without changing it. */
            viewRecitation(studentId, logId) {
                const cls = this.getActiveClass();
                const log = cls.quranRecords?.[studentId]?.logs.find(l => l.id === logId);
                const surah = log && surahByName(log.surahName);
                if (!surah) return;
                this.startRecite(studentId, log.sessionType === 'new' ? 'new' : (log.reviewKind || 'near'));
                Object.assign(this.recite, { surah: surah.num, start: log.fromAyah, end: log.toAyah, hint: log.fromAyah, viewLog: log });
                this.renderClassWorkspace();
            },

            reciteHasSelection() {
                return Boolean(this.recite && !this.recite.viewLog && (this.recite.start || this.recite.end));
            },

            /** Asks before throwing away an unsaved selection. */
            guardRecite(action) {
                if (!this.reciteHasSelection()) {
                    action();
                    return;
                }
                this.pendingReciteAction = action;
                this.openModal('تحديد غير محفوظ', `
                    <div class="space-y-4">
                        <p class="text-sm text-slate-600">حددت آيات لم تُحفظ بعد. هل تريد تجاهل هذا التحديد؟</p>
                        <div class="flex justify-end gap-2">
                            <button onclick="app.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">رجوع</button>
                            <button onclick="app.closeModal(); app.pendingReciteAction?.();" class="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold">تجاهل التحديد</button>
                        </div>
                    </div>
                `);
            },

            reciteChooseStudent(studentId) {
                this.guardRecite(() => this.startRecite(studentId, this.recite?.type));
            },

            reciteStepStudent(step) {
                const cls = this.getActiveClass();
                const list = cls.students;
                const i = list.findIndex(s => s.id === this.recite.studentId);
                const next = list[(i + step + list.length) % list.length];
                if (next) this.reciteChooseStudent(next.id);
            },

            reciteSetType(type) {
                this.guardRecite(() => {
                    const cls = this.getActiveClass();
                    Object.assign(this.recite, { type, start: null, end: null, mode: 'start', viewLog: null }, this.reciteDefaults(cls, this.recite.studentId, type));
                    this.renderClassWorkspace();
                });
            },

            reciteSetSurah(num) {
                const n = Math.min(114, Math.max(1, Number(num) || 1));
                this.guardRecite(() => {
                    Object.assign(this.recite, { surah: n, start: null, end: null, mode: 'start', hint: 1, viewLog: null });
                    this.renderClassWorkspace();
                    document.querySelector('.mushaf-page')?.scrollIntoView({ block: 'start' });
                });
            },

            reciteTapAyah(n) {
                const r = this.recite;
                if (r.viewLog) return;
                if (r.mode === 'start' || !r.start) {
                    r.start = n;
                    if (r.end && r.end < n) r.end = null;
                    r.mode = 'end';
                } else if (n < r.start) {
                    r.end = r.start;
                    r.start = n;
                } else {
                    r.end = n;
                }
                sfx.play('click');
                this.refreshMushafSelection();
            },

            reciteNudge(which, delta) {
                const r = this.recite;
                const total = ALL_SURAHS[r.surah - 1].ayahs;
                if (!r[which]) r[which] = which === 'end' ? (r.start || 1) : (r.end || 1);
                r[which] = Math.min(total, Math.max(1, r[which] + delta));
                if (r.start && r.end && r.start > r.end) {
                    if (which === 'start') r.end = r.start;
                    else r.start = r.end;
                }
                this.refreshMushafSelection();
            },

            reciteClear() {
                Object.assign(this.recite, { start: null, end: null, mode: 'start' });
                this.refreshMushafSelection();
            },

            setMushafSize(delta) {
                this.recite.fontSize = Math.min(52, Math.max(20, this.recite.fontSize + delta));
                localStorage.setItem('moallemkit_mushaf_size', String(this.recite.fontSize));
                document.querySelector('.mushaf-page')?.style.setProperty('--mushaf-size', `${this.recite.fontSize}px`);
            },

            setMushafColor(color) {
                this.recite.color = color;
                localStorage.setItem('moallemkit_mushaf_color', color);
                document.querySelector('.mushaf-page')?.style.setProperty('--sel', color);
                document.querySelectorAll('.swatch').forEach(s => s.classList.toggle('active', s.dataset.color === color));
            },

            jumpToAyah(value) {
                const n = Number(value);
                const el = document.getElementById(`ayah_${n}`);
                if (!el) return;
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.classList.add('flash');
                setTimeout(() => el.classList.remove('flash'), 1200);
            },

            /** Updates highlights and the summary without redrawing the page, so the reading position stays. */
            refreshMushafSelection() {
                const r = this.recite;
                document.querySelectorAll('.ayah').forEach(el => {
                    const n = Number(el.dataset.n);
                    const inRange = r.start && n >= r.start && n <= (r.end || r.start);
                    el.classList.toggle('in-range', Boolean(inRange));
                    el.classList.toggle('is-start', n === r.start);
                    el.classList.toggle('is-end', Boolean(r.end) && n === r.end);
                });
                const panel = document.getElementById('recitePanel');
                if (panel) panel.innerHTML = this.recitePanelHtml();
            },

            reciteSummary() {
                const r = this.recite;
                const surah = ALL_SURAHS[r.surah - 1];
                if (!r.start) return 'اضغط على الآية التي بدأ منها الطالب';
                if (!r.end) return `سورة ${surah.name}: البداية من الآية ${r.start} • اضغط الآن على آخر آية وصل إليها`;
                const count = r.end - r.start + 1;
                return `سورة ${surah.name}، من الآية ${r.start} إلى الآية ${r.end} (${count} ${count > 10 || count < 3 ? 'آية' : 'آيات'})`;
            },

            recitePanelHtml() {
                const r = this.recite;
                if (r.viewLog) {
                    const l = r.viewLog;
                    return `
                        <div class="recite-summary">${esc(this.reciteSummary())}</div>
                        <p class="text-xs text-slate-600">تسميع محفوظ بتاريخ ${fmtDate(l.date)} • ${esc(quranTypeLabel(l))} • ${esc(l.rating)}${l.errors ? ` • ${l.errors} أخطاء` : ''}${l.tajweedNotes ? ` • ${esc(l.tajweedNotes)}` : ''}</p>
                        <div class="flex justify-end"><button onclick="app.openStudentFile('${esc(r.studentId)}')" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">العودة إلى ملف الطالب</button></div>
                    `;
                }
                const ratings = ['ممتاز متقن', 'جيد جداً', 'جيد', 'يحتاج إعادة'];
                const ready = Boolean(r.start && r.end);
                return `
                    <div class="recite-summary ${ready ? 'ready' : ''}">${esc(this.reciteSummary())}</div>
                    <div class="sel-chips">
                        <div class="sel-chip ${r.mode === 'start' ? 'active' : ''}">
                            <button onclick="app.recite.mode = 'start'; app.refreshMushafSelection();" class="sel-label">البداية: ${r.start || '—'}</button>
                            <button onclick="app.reciteNudge('start', -1)" aria-label="البداية آية قبل"><i class="fa-solid fa-chevron-right"></i></button>
                            <button onclick="app.reciteNudge('start', 1)" aria-label="البداية آية بعد"><i class="fa-solid fa-chevron-left"></i></button>
                        </div>
                        <div class="sel-chip ${r.mode === 'end' ? 'active' : ''}">
                            <button onclick="app.recite.mode = 'end'; app.refreshMushafSelection();" class="sel-label">النهاية: ${r.end || '—'}</button>
                            <button onclick="app.reciteNudge('end', -1)" aria-label="النهاية آية قبل"><i class="fa-solid fa-chevron-right"></i></button>
                            <button onclick="app.reciteNudge('end', 1)" aria-label="النهاية آية بعد"><i class="fa-solid fa-chevron-left"></i></button>
                        </div>
                        <button onclick="app.reciteClear()" class="sel-clear" aria-label="مسح التحديد" title="مسح التحديد"><i class="fa-solid fa-rotate-left"></i></button>
                    </div>
                    <div class="grade-row">
                        <select aria-label="التقدير" onchange="app.recite.rating = this.value" class="rating-select">
                            ${ratings.map(x => `<option value="${x}" ${r.rating === x ? 'selected' : ''}>${x}</option>`).join('')}
                        </select>
                        <div class="err-stepper" aria-label="عدد الأخطاء">
                            <button onclick="app.recite.errors = Math.max(0, app.recite.errors - 1); app.refreshMushafSelection();" aria-label="خطأ أقل">−</button>
                            <span>${r.errors} أخطاء</span>
                            <button onclick="app.recite.errors += 1; app.refreshMushafSelection();" aria-label="خطأ إضافي">+</button>
                        </div>
                        <input id="reciteNote" type="text" value="${esc(r.note)}" oninput="app.recite.note = this.value" placeholder="ملاحظة (اختياري)" class="note-input">
                    </div>
                    <div class="recite-actions">
                        <button onclick="app.saveRecitation(false)" ${ready ? '' : 'disabled'} class="primary"><i class="fa-solid fa-floppy-disk"></i> حفظ</button>
                        <button onclick="app.saveRecitation(true)" ${ready ? '' : 'disabled'} class="secondary"><i class="fa-solid fa-check-double"></i> حفظ والتالي</button>
                        <button onclick="app.cancelRecite()" class="ghost" aria-label="إلغاء الجلسة"><i class="fa-solid fa-xmark"></i> إلغاء</button>
                    </div>
                `;
            },

            renderReciteTab(cls, container) {
                const r = this.recite;
                if (!r || !r.studentId || !cls.students.some(s => s.id === r.studentId)) {
                    this.renderRecitePicker(cls, container);
                    return;
                }
                if (!this.quranText) {
                    container.innerHTML = '<div class="mushaf-loading"><i class="fa-solid fa-book-open"></i> جاري فتح المصحف...</div>';
                    this.loadQuran().then(() => this.renderClassWorkspace()).catch(() => {
                        container.innerHTML = '<div class="mushaf-loading">تعذر فتح المصحف في هذا المتصفح. حدّث المتصفح أو افتح التطبيق من رابطه على الإنترنت.</div>';
                    });
                    return;
                }
                const st = cls.students.find(s => s.id === r.studentId);
                const surah = ALL_SURAHS[r.surah - 1];
                const ayahs = this.quranText.get(r.surah) || [];
                const head = this.splitBasmala(r.surah, ayahs[0] || '');
                const types = [['new', 'حفظ جديد'], ['near', 'مراجعة قريبة'], ['far', 'مراجعة بعيدة']];
                const colors = ['#e9b949', '#7cc8ba', '#93c0d6', '#e19ca5', '#c3a1c4'];
                const toArabic = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
                const cls2 = n => [
                    r.start && n >= r.start && n <= (r.end || r.start) ? 'in-range' : '',
                    n === r.start ? 'is-start' : '',
                    r.end && n === r.end ? 'is-end' : ''
                ].join(' ');

                container.innerHTML = `
                    <div class="recite animate-pop">
                        <div class="recite-head card">
                            <div class="student-switch">
                                <button onclick="app.reciteStepStudent(-1)" class="icon-btn" aria-label="الطالب السابق"><i class="fa-solid fa-chevron-right"></i></button>
                                <div class="rec-photo">${this.photoHtml(st)}</div>
                                <select aria-label="الطالب" onchange="app.reciteChooseStudent(this.value)" class="student-select">
                                    ${cls.students.map(s => `<option value="${s.id}" ${s.id === st.id ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}
                                </select>
                                <button onclick="app.reciteStepStudent(1)" class="icon-btn" aria-label="الطالب التالي"><i class="fa-solid fa-chevron-left"></i></button>
                            </div>
                            <div class="seg" role="group" aria-label="نوع التسميع">
                                ${types.map(([k, l]) => `<button onclick="app.reciteSetType('${k}')" aria-pressed="${r.type === k}" class="${r.type === k ? 'active' : ''}">${l}</button>`).join('')}
                            </div>
                        </div>

                        <div class="recite-tools card">
                            <div class="flex items-center gap-1">
                                <button onclick="app.reciteSetSurah(${r.surah - 1})" class="icon-btn" ${r.surah === 1 ? 'disabled' : ''} aria-label="السورة السابقة"><i class="fa-solid fa-chevron-right"></i></button>
                                <select aria-label="السورة" onchange="app.reciteSetSurah(this.value)" class="surah-select">
                                    ${ALL_SURAHS.map(s => `<option value="${s.num}" ${s.num === r.surah ? 'selected' : ''}>${s.num}. ${esc(s.name)}</option>`).join('')}
                                </select>
                                <button onclick="app.reciteSetSurah(${r.surah + 1})" class="icon-btn" ${r.surah === 114 ? 'disabled' : ''} aria-label="السورة التالية"><i class="fa-solid fa-chevron-left"></i></button>
                            </div>
                            <label class="jump">الآية <input type="number" min="1" max="${surah.ayahs}" inputmode="numeric" aria-label="انتقل إلى الآية" onchange="app.jumpToAyah(this.value)"></label>
                            <div class="flex items-center gap-1">
                                <button onclick="app.setMushafSize(-2)" class="icon-btn" aria-label="تصغير الخط">ـأ</button>
                                <button onclick="app.setMushafSize(2)" class="icon-btn big" aria-label="تكبير الخط">أ+</button>
                            </div>
                            <div class="flex items-center gap-1" role="group" aria-label="لون التحديد">
                                ${colors.map(c => `<button onclick="app.setMushafColor('${c}')" data-color="${c}" class="swatch ${r.color === c ? 'active' : ''}" style="background:${c}" aria-label="لون التحديد"></button>`).join('')}
                            </div>
                        </div>

                        <article class="mushaf-page" style="--mushaf-size: ${r.fontSize}px; --sel: ${r.color}">
                            <header class="surah-banner">
                                <span class="meta">${surah.ayahs} آية</span>
                                <h2>سورة ${esc(surah.name)}</h2>
                                <span class="meta">الجزء ${surah.juzFrom}</span>
                            </header>
                            ${head.basmala ? `<p class="basmala">${esc(head.basmala)}</p>` : ''}
                            <p class="ayat" dir="rtl">
                                ${ayahs.map((text, i) => {
                                    const n = i + 1;
                                    const body = i === 0 ? head.text : text;
                                    return `<span id="ayah_${n}" class="ayah ${cls2(n)} ${n === r.hint && !r.start ? 'hint' : ''}" data-n="${n}" role="button" tabindex="0" onclick="app.reciteTapAyah(${n})" aria-label="الآية ${n}">${esc(body)}<span class="ayah-no">۝${toArabic(n)}</span></span> `;
                                }).join('')}
                            </p>
                            <footer class="mushaf-source">نص المصحف: الرسم العثماني برواية حفص عن عاصم، من مشروع تنزيل (tanzil.net)، الإصدار 1.1، برخصة CC BY 3.0، دون تعديل.</footer>
                        </article>

                        <div id="recitePanel" class="recite-panel card">${this.recitePanelHtml()}</div>
                    </div>
                `;
                const target = r.viewLog ? r.start : (r.start || r.hint);
                if (target > 1) requestAnimationFrame(() => document.getElementById(`ayah_${target}`)?.scrollIntoView({ block: 'center' }));
            },

            renderRecitePicker(cls, container) {
                const type = this.recite?.type || 'new';
                const types = [['new', 'حفظ جديد'], ['near', 'مراجعة قريبة'], ['far', 'مراجعة بعيدة']];
                container.innerHTML = `
                    <div class="animate-pop space-y-3">
                        <div class="card p-4">
                            <h2 class="text-lg font-extrabold text-slate-900">جلسة التسميع</h2>
                            <p class="text-xs text-slate-500 mb-3">اختر نوع التسميع، ثم الطالب الذي تستمع إليه</p>
                            <div class="seg" role="group" aria-label="نوع التسميع">
                                ${types.map(([k, l]) => `<button onclick="app.recite = { ...(app.recite || {}), type: '${k}' }; app.renderClassWorkspace();" aria-pressed="${type === k}" class="${type === k ? 'active' : ''}">${l}</button>`).join('')}
                            </div>
                        </div>
                        ${cls.students.length ? `
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger">
                                ${cls.students.map(st => {
                                    const rec = this.ensureStudentQuranRecord(cls, st.id);
                                    const last = rec.logs[0];
                                    const plan = rec.nextPlan;
                                    const planText = type === 'new' ? `${plan.newSurah} ${plan.newFrom}-${plan.newTo}` : `${plan.revSurah} ${plan.revFrom}-${plan.revTo}`;
                                    return `
                                        <button onclick="app.startRecite('${st.id}', '${type}')" class="pick-card card text-right">
                                            <div class="rec-photo">${this.photoHtml(st)}</div>
                                            <div class="min-w-0 flex-1">
                                                <div class="font-extrabold text-slate-900 truncate">${esc(st.name)}</div>
                                                <div class="text-[11px] text-slate-500 truncate">المقترح: ${esc(planText)}</div>
                                                ${last ? `<div class="text-[11px] text-slate-500 truncate">آخر تسميع: ${esc(quranTypeLabel(last))} • ${esc(last.surahName)} ${last.fromAyah}-${last.toAyah} • ${fmtDate(last.date)}</div>` : ''}
                                            </div>
                                            <span class="pick-go"><i class="fa-solid fa-book-open"></i> بدء</span>
                                        </button>
                                    `;
                                }).join('')}
                            </div>
                        ` : '<p class="text-center text-sm text-slate-500 py-8">أضف طلابًا إلى الحلقة أولًا</p>'}
                    </div>
                `;
            },

            cancelRecite() {
                this.guardRecite(() => {
                    this.recite = { ...this.recite, studentId: null, start: null, end: null, viewLog: null };
                    this.renderClassWorkspace();
                    this.showToast('أُلغيت الجلسة دون تسجيل', 'info');
                });
            },

            /** Saves the recitation into the student's record after the teacher confirms. */
            saveRecitation(goNext) {
                const cls = this.getActiveClass();
                const r = this.recite;
                if (!r?.start || !r?.end || r.viewLog) return;
                const surah = ALL_SURAHS[r.surah - 1];
                const st = cls.students.find(s => s.id === r.studentId);
                const rec = this.ensureStudentQuranRecord(cls, st.id);
                const today = getTodayStr(0);
                const occurrence = this.occurrences(cls, today, today).find(o => !o.cancelled);
                const lessonKey = occurrence ? occurrence.key : today;
                const now = new Date();
                const entry = {
                    id: `qlog_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
                    date: today,
                    lessonKey,
                    sessionType: r.type === 'new' ? 'new' : 'revision',
                    reviewKind: r.type === 'new' ? '' : r.type,
                    surahName: surah.name,
                    fromAyah: r.start,
                    toAyah: r.end,
                    errors: r.errors,
                    tajweedNotes: (r.note || '').trim().slice(0, 1000),
                    rating: r.rating,
                    source: 'mushaf',
                    time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
                };
                // A second tap on save must not create the same record twice.
                const same = rec.logs.find(l => l.date === today && l.sessionType === entry.sessionType && (l.reviewKind || '') === entry.reviewKind
                    && l.surahName === entry.surahName && l.fromAyah === entry.fromAyah && l.toAyah === entry.toAyah);
                if (same) Object.assign(same, { ...entry, id: same.id });
                else rec.logs.unshift(entry);
                this.applyQuranProgress(rec, surah, entry);

                // Reciting means the student is present; an existing attendance mark is never changed.
                cls.attendance = cls.attendance || {};
                const day = cls.attendance[lessonKey] || (cls.attendance[lessonKey] = {});
                if (!day[st.id]) day[st.id] = this.attendanceTypes().find(t => t.countsAs === 'present')?.id || 'present';

                this.saveData();
                sfx.play('positive');
                this.showToast(`حُفظ: ${st.name} • ${quranTypeLabel(entry)} • سورة ${surah.name} ${entry.fromAyah}-${entry.toAyah}`);

                if (goNext) {
                    const i = cls.students.findIndex(s => s.id === st.id);
                    const next = cls.students[i + 1];
                    if (next) {
                        this.startRecite(next.id, r.type);
                        return;
                    }
                    this.showToast('انتهى طلاب الحلقة', 'info');
                }
                Object.assign(r, { start: null, end: null, mode: 'start', rating: 'جيد جداً', errors: 0, note: '' }, this.reciteDefaults(cls, st.id, r.type));
                this.renderClassWorkspace();
            },

            /* ==========================================
               DAY AND NIGHT
               ========================================== */
            isNightNow() {
                const hour = new Date().getHours();
                return hour < NIGHT_ENDS_HOUR || hour >= NIGHT_STARTS_HOUR;
            },

            wantsDark() {
                if (this.themeMode === 'dark') return true;
                if (this.themeMode === 'light') return false;
                return this.isNightNow();
            },

            applyTheme(animate = false) {
                const dark = this.wantsDark();
                const root = document.documentElement;
                if (root.classList.contains('dark') === dark) return;
                if (animate) {
                    root.classList.add('theme-fade');
                    setTimeout(() => root.classList.remove('theme-fade'), 700);
                }
                root.classList.toggle('dark', dark);
                document.querySelectorAll('.theme-switch button').forEach(btn => btn.setAttribute('aria-pressed', String((btn.dataset.mode === 'dark') === dark)));
            },

            /** Day and night grow out of the button as a circle where the browser supports it. */
            switchTheme(event = null) {
                const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (!document.startViewTransition || reduced || !event || document.visibilityState !== 'visible') {
                    this.applyTheme(true);
                    return;
                }
                const rect = event.currentTarget.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
                const style = document.documentElement.style;
                style.setProperty('--reveal-x', `${x}px`);
                style.setProperty('--reveal-y', `${y}px`);
                style.setProperty('--reveal-r', `${radius}px`);
                const transition = document.startViewTransition(() => this.applyTheme(false));
                // The browser may skip the animation; the theme must still change.
                transition.ready.catch(() => this.applyTheme(false));
                setTimeout(() => this.applyTheme(false), 400);
                transition.finished.catch(() => {});
                transition.updateCallbackDone.catch(() => {});
            },

            toggleTheme(event) {
                this.themeMode = this.wantsDark() ? 'light' : 'dark';
                localStorage.setItem(this.THEME_KEY, this.themeMode);
                sfx.play('click');
                this.switchTheme(event);
                this.updateThemeChoices();
            },

            setThemeMode(mode) {
                this.themeMode = mode;
                if (mode === 'auto') localStorage.removeItem(this.THEME_KEY);
                else localStorage.setItem(this.THEME_KEY, mode);
                this.applyTheme(true);
                this.updateThemeChoices();
            },

            updateThemeChoices() {
                const dark = this.wantsDark();
                document.querySelectorAll('.theme-switch button').forEach(btn => {
                    btn.setAttribute('aria-pressed', String((btn.dataset.mode === 'dark') === dark));
                });
                document.querySelectorAll('[data-theme-choice]').forEach(btn => {
                    const active = btn.dataset.themeChoice === this.themeMode;
                    btn.classList.toggle('bg-indigo-600', active);
                    btn.classList.toggle('text-white', active);
                    btn.classList.toggle('bg-slate-100', !active);
                    btn.setAttribute('aria-pressed', String(active));
                });
            },

            /** Keeps the home clock, the session states and the automatic theme current. */
            tick() {
                this.applyTheme(true);
                if (!document.getElementById('dashboardView').classList.contains('hidden')) this.renderHomeHero();
            },

            /* ==========================================
               VIEW 1: DASHBOARD RENDERING
               ========================================== */
            renderDashboard() {
                this.renderHomeHero();
                const classes = this.activeClasses();
                const totalStudents = classes.reduce((s, c) => s + c.students.length, 0);
                const classRates = classes.map(c => this.getClassAttendanceRate(c)).filter(rate => rate !== null);
                const avgAtt = classRates.length
                    ? Math.round(classRates.reduce((s, rate) => s + rate, 0) / classRates.length)
                    : null;
                const totalBehaviorEvents = classes.reduce((s, c) => s + (c.behaviorLogs ? c.behaviorLogs.length : 0), 0);

                document.getElementById('totalClassesBadge').textContent = classes.length;

                // Render Top Summary Cards
                document.getElementById('dashboardSummary').innerHTML = `
                    <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
                        <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shrink-0">
                            <i class="fa-solid fa-chalkboard-user"></i>
                        </div>
                        <div>
                            <div class="text-xs text-slate-500 font-semibold">إجمالي الحلقات</div>
                            <div class="text-xl sm:text-2xl font-extrabold text-slate-900">${classes.length} فصول</div>
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
                        <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
                            <i class="fa-solid fa-user-graduate"></i>
                        </div>
                        <div>
                            <div class="text-xs text-slate-500 font-semibold">إجمالي الطلاب</div>
                            <div class="text-xl sm:text-2xl font-extrabold text-slate-900">${totalStudents} طالب</div>
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
                        <div class="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-xl shrink-0">
                            <i class="fa-solid fa-calendar-check"></i>
                        </div>
                        <div>
                            <div class="text-xs text-slate-500 font-semibold">متوسط الحضور العام</div>
                            <div class="text-xl sm:text-2xl font-extrabold text-slate-900">${fmtPct(avgAtt)}</div>
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
                        <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0">
                            <i class="fa-solid fa-medal"></i>
                        </div>
                        <div>
                            <div class="text-xs text-slate-500 font-semibold">تقييمات السلوك</div>
                            <div class="text-xl sm:text-2xl font-extrabold text-slate-900">${totalBehaviorEvents} تقييم</div>
                        </div>
                    </div>
                `;

                const query = (document.getElementById('dashboardSearchInput')?.value || '').trim().toLowerCase();

                // Check for matching students across all classes if query exists
                const studentSearchBox = document.getElementById('globalStudentSearchResults');
                if (query.length > 1) {
                    const matchedStudents = [];
                    classes.forEach(c => {
                        c.students.forEach(st => {
                            if (st.name.toLowerCase().includes(query)) {
                                matchedStudents.push({ student: st, cls: c });
                            }
                        });
                    });
                    if (matchedStudents.length > 0) {
                        studentSearchBox.classList.remove('hidden');
                        studentSearchBox.innerHTML = `
                            <div class="text-xs font-bold text-slate-500 mb-2.5 flex items-center gap-1.5">
                                <i class="fa-solid fa-user-magnifying-glass text-indigo-600"></i>
                                <span>نتائج البحث في قوائم الطلاب (${matchedStudents.length}):</span>
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                ${matchedStudents.map(({ student, cls }) => `
                                    <button onclick="app.openClass('${cls.id}', 'roster'); setTimeout(() => app.openStudentProfileModal('${student.id}'), 100);" class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 transition-colors text-right">
                                        <div class="flex items-center gap-2.5">
                                            <div class="w-9 h-9 rounded-full ${student.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0">
                                                ${esc(this.getInitials(student.name))}
                                            </div>
                                            <div>
                                                <div class="font-bold text-xs sm:text-sm text-slate-800">${esc(student.name)}</div>
                                                <div class="text-[11px] text-slate-500">${esc(cls.name)} • ${esc(cls.subject)}</div>
                                            </div>
                                        </div>
                                        <i class="fa-solid fa-arrow-left text-xs text-slate-400"></i>
                                    </button>
                                `).join('')}
                            </div>
                        `;
                    } else {
                        studentSearchBox.classList.add('hidden');
                    }
                } else {
                    studentSearchBox.classList.add('hidden');
                }

                // Filter Classes
                const filteredClasses = classes.filter(c =>
                    !query ||
                    c.name.toLowerCase().includes(query) ||
                    c.subject.toLowerCase().includes(query) ||
                    c.students.some(s => s.name.toLowerCase().includes(query))
                );

                const grid = document.getElementById('classesGrid');
                grid.classList.toggle('hidden', !query);
                if (!query) {
                    grid.innerHTML = '';
                    return;
                }
                if (filteredClasses.length === 0) {
                    grid.innerHTML = `
                        <div class="col-span-full bg-white rounded-2xl p-10 text-center border border-dashed border-slate-300">
                            <div class="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl mx-auto mb-3">
                                <i class="fa-solid fa-folder-plus"></i>
                            </div>
                            <h3 class="font-bold text-lg text-slate-800">لا توجد حلقات مطابقة</h3>
                            <p class="text-sm text-slate-500 mt-1 mb-4">يمكنك حلقة جديدة للبدء في تنظيم طلابك</p>
                            <button onclick="app.openClassModal()" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700">
                                + إضافة حلقة
                            </button>
                        </div>
                    `;
                    return;
                }

                grid.innerHTML = filteredClasses.map(cls => {
                    const theme = CLASS_THEMES[cls.theme] || CLASS_THEMES.indigo;
                    const attRate = this.getClassAttendanceRate(cls);
                    const avgGrade = this.getClassAverageGrade(cls);

                    return `
                        <div class="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col group">
                            <!-- Card Top Header -->
                            <div onclick="app.openClass('${cls.id}', 'roster')" class="bg-gradient-to-l ${theme.bgGrad} p-5 text-white cursor-pointer relative overflow-hidden">
                                <i class="fa-solid ${cls.icon || 'fa-book-open'} absolute -left-3 -bottom-3 text-7xl text-white/10 group-hover:scale-110 transition-transform"></i>
                                <div class="flex items-start justify-between gap-2 relative z-10">
                                    <div>
                                        <span class="inline-block text-[11px] font-bold bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full mb-1.5">
                                            ${esc(cls.room || 'قاعة دراسية')}
                                        </span>
                                        <h2 class="text-xl font-extrabold leading-snug">${esc(cls.name)}</h2>
                                        <p class="text-white/90 text-xs sm:text-sm font-medium mt-0.5">${esc(cls.subject)}</p>
                                    </div>
                                    <div class="flex items-center gap-1" onclick="event.stopPropagation()">
                                        <button onclick="app.openClassModal('${cls.id}')" title="إعدادات الحلقة" class="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors">
                                            <i class="fa-solid fa-pen text-xs"></i>
                                        </button>
                                        <button onclick="app.confirmDeleteClass('${cls.id}')" title="حذف الحلقة" class="w-8 h-8 rounded-lg bg-white/15 hover:bg-rose-500 text-white flex items-center justify-center transition-colors">
                                            <i class="fa-solid fa-trash text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-white/90 relative z-10">
                                    <span class="flex items-center gap-1.5">
                                        <i class="fa-regular fa-clock"></i>
                                        <span>${esc(this.scheduleText(cls))}</span>
                                    </span>
                                    <span class="font-bold bg-black/20 px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">${cls.students.length} طلاب</span>
                                </div>
                            </div>

                            <!-- Card Metrics Body -->
                            <div onclick="app.openClass('${cls.id}', 'roster')" class="p-4 flex-1 flex flex-col justify-between cursor-pointer">
                                <div class="grid grid-cols-2 gap-3 mb-4">
                                    <div class="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                                        <div class="text-[11px] text-slate-500 font-semibold flex items-center justify-between">
                                            <span>نسبة الحضور</span>
                                            <i class="fa-solid fa-user-check text-emerald-500"></i>
                                        </div>
                                        <div class="text-lg font-extrabold text-slate-800 mt-0.5">${fmtPct(attRate)}</div>
                                        <div class="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                                            <div class="bg-emerald-500 h-full rounded-full" style="width: ${attRate ?? 0}%"></div>
                                        </div>
                                    </div>
                                    <div class="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                                        <div class="text-[11px] text-slate-500 font-semibold flex items-center justify-between">
                                            <span>متوسط الدرجات</span>
                                            <i class="fa-solid fa-award text-indigo-500"></i>
                                        </div>
                                        <div class="text-lg font-extrabold text-slate-800 mt-0.5">${fmtPct(avgGrade)}</div>
                                        <div class="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                                            <div class="bg-indigo-500 h-full rounded-full" style="width: ${avgGrade ?? 0}%"></div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Quick Action Shortcuts (5 buttons including Quran) -->
                                <div class="grid grid-cols-5 gap-1 pt-2 border-t border-slate-100" onclick="event.stopPropagation()">
                                    <button onclick="app.openClass('${cls.id}', 'attendance')" class="flex flex-col items-center justify-center py-2 px-1 rounded-xl hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors">
                                        <i class="fa-solid fa-user-check text-sm mb-1 text-emerald-600"></i>
                                        <span class="text-[10px] font-bold">الحضور</span>
                                    </button>
                                    <button onclick="app.openClass('${cls.id}', 'behavior')" class="flex flex-col items-center justify-center py-2 px-1 rounded-xl hover:bg-amber-50 text-slate-600 hover:text-amber-700 transition-colors">
                                        <i class="fa-solid fa-star text-sm mb-1 text-amber-500"></i>
                                        <span class="text-[10px] font-bold">السلوك</span>
                                    </button>
                                    <button onclick="app.openClass('${cls.id}', 'quran')" class="flex flex-col items-center justify-center py-2 px-1 rounded-xl hover:bg-teal-50 text-slate-600 hover:text-teal-700 transition-colors">
                                        <i class="fa-solid fa-book-quran text-sm mb-1 text-teal-600"></i>
                                        <span class="text-[10px] font-bold">القرآن</span>
                                    </button>
                                    <button onclick="app.openClass('${cls.id}', 'grades')" class="flex flex-col items-center justify-center py-2 px-1 rounded-xl hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 transition-colors">
                                        <i class="fa-solid fa-award text-sm mb-1 text-indigo-600"></i>
                                        <span class="text-[10px] font-bold">الدرجات</span>
                                    </button>
                                    <button onclick="app.openClass('${cls.id}', 'seating')" class="flex flex-col items-center justify-center py-2 px-1 rounded-xl hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition-colors">
                                        <i class="fa-solid fa-chair text-sm mb-1 text-purple-600"></i>
                                        <span class="text-[10px] font-bold">المقاعد</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
            },

            /* ==========================================
               VIEW 2: ACTIVE CLASS WORKSPACE
               ========================================== */
            renderClassWorkspace() {
                const cls = this.getActiveClass();
                if (!cls) return this.showDashboard();

                const attRate = this.getClassAttendanceRate(cls);
                const avgGrade = this.getClassAverageGrade(cls);

                // Update Top Class Banner
                const headerCard = document.getElementById('classHeaderCard');
                headerCard.className = 'no-print';
                headerCard.innerHTML = `
                    <div class="chalkboard">
                        <h1>${esc(cls.name)}${cls.code ? ` <small>(${esc(cls.code)})</small>` : ''}</h1>
                        <div class="chalk-line">
                            <span>${esc(cls.subject)}</span>
                            ${cls.room ? `<span>${esc(cls.room)}</span>` : ''}
                            <span>الطلاب <b>${cls.students.length}</b></span>
                            <span>الحضور <b>${fmtPct(attRate)}</b></span>
                            <span>الدرجات <b>${fmtPct(avgGrade)}</b></span>
                            ${cls.termStart || cls.termEnd ? `<span>من ${fmtDate(cls.termStart) || '…'} إلى ${fmtDate(cls.termEnd) || '…'}</span>` : ''}
                        </div>
                    </div>
                `;

                // Highlight Active Tab Button
                document.querySelectorAll('.class-tab-btn').forEach(btn => {
                    const isAct = btn.getAttribute('data-tab') === ({ quran: 'seating', session: 'sessions' }[this.activeTab] || this.activeTab);
                    btn.className = `class-tab-btn flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        isAct
                            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                            : 'text-slate-600 hover:bg-slate-100'
                    }`;
                });

                // Render Selected Module
                const container = document.getElementById('tabContentArea');
                if (this.activeTab === 'roster') {
                    this.activeTab = 'seating';
                    this.circleView = 'list';
                }
                if (['calendar'].includes(this.activeTab)) this.activeTab = 'sessions';
                if (this.activeTab === 'quran' && !cls.students.some(s => s.id === this.activeQuranStudentId)) this.activeTab = 'seating';
                if (this.activeTab === 'session' && !this.activeSessionKey) this.activeTab = 'sessions';
                container.classList.toggle('no-anim', !this.animateNext);
                this.animateNext = false;
                if (this.activeTab === 'sessions') this.renderSessionsTab(cls, container);
                else if (this.activeTab === 'session') this.renderSessionPage(cls, container);
                else if (this.activeTab === 'recite') this.renderReciteTab(cls, container);
                else if (this.activeTab === 'attendance') this.renderAttendanceTab(cls, container);
                else if (this.activeTab === 'behavior') this.renderBehaviorTab(cls, container);
                else if (this.activeTab === 'quran') this.renderQuranTab(cls, container);
                else if (this.activeTab === 'grades') this.renderGradesTab(cls, container);
                else if (this.activeTab === 'seating') this.renderCircleHome(cls, container);
                else if (this.activeTab === 'reports') this.renderReportsTab(cls, container);
                else if (this.activeTab === 'calendar') this.renderCalendarTab(cls, container);
                if (this.activeTab === 'reports') container.firstElementChild?.insertAdjacentHTML('afterbegin', this.reportChartsHtml(cls));
                if (this.activeTab === 'quran') {
                    const st = cls.students.find(s => s.id === this.activeQuranStudentId);
                    if (st) container.firstElementChild?.insertAdjacentHTML('afterbegin', this.studentFileCardHtml(cls, st));
                }
                const tabName = document.getElementById('circleTabName');
                if (tabName) tabName.textContent = cls.name;
            },

            /* ==========================================
               TAB 1: STUDENTS ROSTER (قائمة الطلاب)
               ========================================== */
            onRosterSearch(value) {
                this.rosterSearchQuery = value;
                this.renderClassWorkspace();
                const input = document.getElementById('rosterSearchInput');
                input?.focus();
                input?.setSelectionRange(value.length, value.length);
            },

            renderArchivedStudents(cls, container) {
                const archived = cls.archivedStudents || [];
                if (!archived.length) return;
                container.insertAdjacentHTML('beforeend', `
                    <details class="mt-4 bg-white rounded-2xl border border-slate-200 p-4 no-print">
                        <summary class="font-bold text-sm text-slate-700 cursor-pointer">الطلاب المؤرشفون (${archived.length})</summary>
                        <div class="mt-3 space-y-2">
                            ${archived.map(st => `
                                <div class="flex items-center justify-between gap-2 text-sm bg-slate-50 rounded-xl p-2.5">
                                    <span class="font-bold text-slate-700 truncate">${esc(st.name)}</span>
                                    <div class="flex gap-2 shrink-0">
                                        <button onclick="app.restoreStudent('${st.id}')" class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold">استعادة</button>
                                        <button onclick="app.confirmPurgeArchivedStudent('${st.id}')" class="px-3 py-1.5 rounded-lg bg-white border border-rose-300 text-rose-700 text-xs font-bold">حذف نهائي</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </details>
                `);
            },

            renderRosterTab(cls, container) {
                const filtered = cls.students.filter(s =>
                    !this.rosterSearchQuery || s.name.toLowerCase().includes(this.rosterSearchQuery.toLowerCase())
                );

                container.innerHTML = `
                    <div class="space-y-4 animate-pop">
                        <!-- Action Bar -->
                        <div class="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                            <div class="relative flex-1 max-w-md">
                                <i class="fa-solid fa-magnifying-glass absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                                <input type="text" value="${esc(this.rosterSearchQuery)}" id="rosterSearchInput" oninput="app.onRosterSearch(this.value)" placeholder="ابحث عن طالب بالاسم..." class="w-full pr-9 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            </div>
                            <div class="flex items-center gap-2">
                                <button onclick="app.openBulkStudentsModal()" class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-colors">
                                    <i class="fa-solid fa-users-gear"></i>
                                    <span>إضافة مجموعة أسماء</span>
                                </button>
                                <button onclick="app.openStudentModal()" class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors">
                                    <i class="fa-solid fa-user-plus"></i>
                                    <span>إضافة طالب</span>
                                </button>
                            </div>
                        </div>

                        <!-- Students Grid -->
                        ${filtered.length === 0 ? `
                            <div class="bg-white rounded-2xl p-10 text-center border border-dashed border-slate-300">
                                <i class="fa-solid fa-users text-4xl text-slate-300 mb-2"></i>
                                <p class="font-bold text-slate-700">لا يوجد طلاب في القائمة حالياً</p>
                                <button onclick="app.openStudentModal()" class="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">+ أضف أول طالب</button>
                            </div>
                        ` : `
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                ${filtered.map((st) => {
                                    const att = this.getStudentAttendanceStats(cls, st.id);
                                    const beh = this.getStudentBehaviorStats(cls, st.id);
                                    const grd = this.getStudentGradeStats(cls, st.id);
                                    const qur = this.getStudentQuranStats(cls, st.id);

                                    return `
                                        <div onclick="app.openStudentProfileModal('${st.id}')" class="bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group">
                                            <div>
                                                <div class="flex items-start justify-between gap-2">
                                                    <div class="flex items-center gap-3">
                                                        <div class="w-12 h-12 rounded-2xl ${st.avatarColor} text-white font-extrabold text-sm flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                                                            ${esc(this.getInitials(st.name))}
                                                        </div>
                                                        <div>
                                                            <h3 class="font-extrabold text-slate-900 text-sm sm:text-base group-hover:text-indigo-600 transition-colors">${esc(st.name)}</h3>
                                                            <div class="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                                                                <span><i class="fa-solid fa-phone text-[10px] ml-1"></i>${esc(st.guardianPhone || 'بدون رقم')}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-center gap-1" onclick="event.stopPropagation()">
                                                        <button onclick="app.openStudentQuranDetail('${st.id}')" title="متابعة القرآن (جزء عم وتبارك)" class="w-7 h-7 rounded-lg text-teal-600 hover:bg-teal-50 flex items-center justify-center">
                                                            <i class="fa-solid fa-book-quran text-xs"></i>
                                                        </button>
                                                        <button onclick="app.openStudentModal('${st.id}')" title="تعديل بيانات الطالب" class="w-7 h-7 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 flex items-center justify-center">
                                                            <i class="fa-solid fa-pen text-xs"></i>
                                                        </button>
                                                        <button onclick="app.confirmDeleteStudent('${st.id}')" title="حذف الطالب" class="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center">
                                                            <i class="fa-solid fa-trash text-xs"></i>
                                                        </button>
                                                    </div>
                                                </div>

                                                ${st.notes ? `<p class="mt-2.5 text-xs bg-amber-50/80 text-amber-800 px-2.5 py-1.5 rounded-lg border border-amber-200/60 line-clamp-1"><i class="fa-regular fa-note-sticky ml-1"></i>${esc(st.notes)}</p>` : ''}
                                            </div>

                                            <!-- Student Mini Stats Footer -->
                                            <div class="grid grid-cols-4 gap-1.5 mt-4 pt-3 border-t border-slate-100 text-center">
                                                <div class="bg-slate-50 rounded-xl py-1.5 px-1">
                                                    <div class="text-[10px] text-slate-400 font-semibold">الحضور</div>
                                                    <div class="text-xs font-extrabold ${att.rate === null ? 'text-slate-400' : (att.rate >= 85 ? 'text-emerald-600' : 'text-amber-600')}">${fmtPct(att.rate)}</div>
                                                </div>
                                                <div class="bg-slate-50 rounded-xl py-1.5 px-1">
                                                    <div class="text-[10px] text-slate-400 font-semibold">السلوك</div>
                                                    <div class="text-xs font-extrabold ${beh.net >= 0 ? 'text-emerald-600' : 'text-rose-600'} dir-ltr">
                                                        ${beh.net > 0 ? `+${beh.net}` : beh.net}
                                                    </div>
                                                </div>
                                                <div class="bg-slate-50 rounded-xl py-1.5 px-1">
                                                    <div class="text-[10px] text-slate-400 font-semibold">الدرجات</div>
                                                    <div class="text-xs font-extrabold text-indigo-600">${fmtPct(grd.pct)}</div>
                                                </div>
                                                <div onclick="event.stopPropagation(); app.openStudentQuranDetail('${st.id}')" class="bg-teal-50/70 hover:bg-teal-100 rounded-xl py-1.5 px-1 transition-colors">
                                                    <div class="text-[10px] text-teal-700 font-semibold">جزء عمّ</div>
                                                    <div class="text-xs font-extrabold text-teal-700">${qur.ammaCompleted}/${qur.ammaTotal}</div>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        `}
                    </div>
                `;
            },

            /* ==========================================
               TAB 2: ATTENDANCE TRACKER (الحضور والغياب)
               ========================================== */
            setAttendance(studentId, status) {
                const cls = this.getActiveClass();
                if (!cls.attendance) cls.attendance = {};
                if (!cls.attendance[this.attendanceKey()]) cls.attendance[this.attendanceKey()] = {};
                cls.attendance[this.attendanceKey()][studentId] = status;
                sfx.play('click');
                this.saveData();
                this.renderClassWorkspace();
            },

            CycleStudentAttendance(studentId) {
                const cls = this.getActiveClass();
                const order = this.attendanceTypes().map(t => t.id);
                const curr = (cls.attendance?.[this.attendanceKey()] || {})[studentId];
                const next = order[(order.indexOf(curr) + 1) % order.length];
                this.setAttendance(studentId, next);
            },

            markAllAttendance(status) {
                const cls = this.getActiveClass();
                if (!cls.attendance) cls.attendance = {};
                if (!cls.attendance[this.attendanceKey()]) cls.attendance[this.attendanceKey()] = {};
                cls.students.forEach(st => {
                    cls.attendance[this.attendanceKey()][st.id] = status;
                });
                sfx.play('positive');
                this.saveData();
                this.renderClassWorkspace();
                this.showToast('تم رصد جميع طلاب الحلقة بنجاح');
            },

            clearDayAttendance() {
                const cls = this.getActiveClass();
                if (cls.attendance && cls.attendance[this.attendanceKey()]) {
                    delete cls.attendance[this.attendanceKey()];
                    this.saveData();
                    this.renderClassWorkspace();
                    this.showToast('تم مسح سجل حضور هذا اليوم', 'info');
                }
            },

            /* ==========================================
               TAB 3: BEHAVIOR & PARTICIPATION (تقييم السلوك)
               ========================================== */
            toggleBehaviorStudentSelection(studentId) {
                const idx = this.selectedBehaviorStudentIds.indexOf(studentId);
                if (idx === -1) this.selectedBehaviorStudentIds.push(studentId);
                else this.selectedBehaviorStudentIds.splice(idx, 1);
                this.renderClassWorkspace();
            },

            toggleSelectAllBehaviorStudents() {
                const cls = this.getActiveClass();
                if (this.selectedBehaviorStudentIds.length === cls.students.length) {
                    this.selectedBehaviorStudentIds = [];
                } else {
                    this.selectedBehaviorStudentIds = cls.students.map(s => s.id);
                }
                this.renderClassWorkspace();
            },

            openGiveBehaviorModal(studentIds) {
                const cls = this.getActiveClass();
                const names = studentIds.map(id => cls.students.find(s => s.id === id)?.name).filter(Boolean);
                const title = names.length === 1 ? `تقييم سلوك ومشاركة: ${names[0]}` : `تقييم جماعي (${names.length} طلاب)`;

                const posBadges = this.behaviorTypes().filter(b => b.type === 'positive');
                const negBadges = this.behaviorTypes().filter(b => b.type === 'negative');

                this.openModal(title, `
                    <div class="space-y-4">
                        <div>
                            <label for="behaviorDateInput" class="block text-xs font-bold text-slate-600 mb-1.5">التاريخ</label>
                            ${this.dateInputHtml('behaviorDateInput', getTodayStr(0))}
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-600 mb-1.5">ملاحظة إضافية (اختياري):</label>
                            <input type="text" id="behaviorCustomNote" placeholder="مثال: إجابة نموذجية على السبورة..." class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        </div>

                        <div>
                            <div class="text-xs font-extrabold text-emerald-700 mb-2 flex items-center gap-1.5">
                                <i class="fa-solid fa-wand-magic-sparkles"></i>
                                <span>تعزيز إيجابي ومشاركة</span>
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                ${posBadges.map(b => `
                                    <button onclick='app.awardBehavior(${JSON.stringify(studentIds)}, "${b.id}")' class="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/80 flex items-center justify-between text-right transition-all group">
                                        <div class="flex items-center gap-2.5">
                                            <div class="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
                                                <i class="fa-solid ${b.icon}"></i>
                                            </div>
                                            <span class="text-xs font-bold text-slate-800">${esc(b.label)}</span>
                                        </div>
                                        <span class="text-xs font-extrabold text-emerald-700 bg-emerald-200/70 px-2 py-0.5 rounded-full">+${b.points}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <div>
                            <div class="text-xs font-extrabold text-rose-700 mb-2 flex items-center gap-1.5">
                                <i class="fa-solid fa-triangle-exclamation"></i>
                                <span>تنبيهات وملاحظات سلوكية</span>
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                ${negBadges.map(b => `
                                    <button onclick='app.awardBehavior(${JSON.stringify(studentIds)}, "${b.id}")' class="p-3 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100/80 flex items-center justify-between text-right transition-all group">
                                        <div class="flex items-center gap-2.5">
                                            <div class="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
                                                <i class="fa-solid ${b.icon}"></i>
                                            </div>
                                            <span class="text-xs font-bold text-slate-800">${esc(b.label)}</span>
                                        </div>
                                        <span class="text-xs font-extrabold text-rose-700 bg-rose-200/70 px-2 py-0.5 rounded-full">${b.points}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `);
            },

            awardBehavior(studentIds, badgeId) {
                const cls = this.getActiveClass();
                const badge = this.behaviorTypes().find(b => b.id === badgeId);
                const logDate = parseDMY(document.getElementById('behaviorDateInput')?.value) || getTodayStr(0);
                if (!badge) return;
                const note = (document.getElementById('behaviorCustomNote')?.value || '').trim();

                if (!cls.behaviorLogs) cls.behaviorLogs = [];
                studentIds.forEach(stId => {
                    cls.behaviorLogs.push({
                        id: 'beh_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
                        studentId: stId,
                        badgeId: badge.id,
                        label: badge.label,
                        points: badge.points,
                        type: badge.type,
                        date: logDate,
                        note
                    });
                });

                sfx.play(badge.points > 0 ? 'positive' : 'negative');
                this.selectedBehaviorStudentIds = [];
                this.behaviorSelectMode = false;
                this.saveData();
                this.closeModal();
                this.renderClassWorkspace();
                this.showToast(`تم رصد "${badge.label}" بنجاح`, badge.points > 0 ? 'success' : 'info');
            },

            deleteBehaviorLog(logId) {
                const cls = this.getActiveClass();
                cls.behaviorLogs = (cls.behaviorLogs || []).filter(l => l.id !== logId);
                this.saveData();
                this.renderClassWorkspace();
                this.showToast('تم حذف سجل السلوك', 'info');
            },

            /* ==========================================
               TAB 4: QURAN CIRCLE TRACKING (المتابعة القرآنية - جزء عمّ وتبارك)
               ========================================== */
            openStudentQuranDetail(studentId) {
                this.openStudentFile(studentId);
            },

            renderQuranTab(cls, container) {
                // A selected student opens the individual follow-up page.
                if (this.activeQuranStudentId) {
                    const st = cls.students.find(s => s.id === this.activeQuranStudentId);
                    if (st) {
                        this.renderIndividualStudentQuranPage(cls, st, container);
                        return;
                    }
                    this.activeQuranStudentId = null;
                }

                const stats = cls.students.map(st => ({ st, q: this.getStudentQuranStats(cls, st.id) }));
                const totalSessions = stats.reduce((sum, row) => sum + row.q.logs.length, 0);
                const today = getTodayStr(0);
                const reciters = stats.filter(row => row.q.logs.some(l => l.date === today)).length;
                const classPct = stats.length ? Math.round(stats.reduce((sum, row) => sum + row.q.quranPct, 0) / stats.length) : 0;

                container.innerHTML = `
                    <div class="space-y-5 animate-pop">
                        <div class="bg-gradient-to-l from-teal-700 to-emerald-600 rounded-2xl p-5 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div class="flex items-center gap-3.5">
                                <div class="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center text-2xl shrink-0">
                                    <i class="fa-solid fa-book-quran"></i>
                                </div>
                                <div>
                                    <h3 class="text-lg sm:text-xl font-extrabold">متابعة القرآن الكريم</h3>
                                    <p class="text-xs sm:text-sm text-white/85 mt-0.5">اختر طالبًا لفتح صفحته وتسجيل الحفظ والمراجعة في أي سورة من السور الـ114</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-3 gap-2 text-center shrink-0">
                                <div class="bg-black/15 rounded-xl px-3 py-2"><div class="text-lg font-extrabold">${reciters}/${stats.length}</div><div class="text-[10px] text-white/80">سمّعوا اليوم</div></div>
                                <div class="bg-black/15 rounded-xl px-3 py-2"><div class="text-lg font-extrabold">${totalSessions}</div><div class="text-[10px] text-white/80">جلسة تسميع</div></div>
                                <div class="bg-black/15 rounded-xl px-3 py-2"><div class="text-lg font-extrabold">${classPct}%</div><div class="text-[10px] text-white/80">متوسط الإنجاز</div></div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
                            ${stats.map(({ st, q }, idx) => {
                                const last = q.lastLog;
                                return `
                                    <div onclick="app.openStudentQuranDetail('${st.id}')" class="bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-teal-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group">
                                        <div>
                                            <div class="flex items-center gap-3 mb-3">
                                                <div class="w-11 h-11 rounded-2xl ${st.avatarColor} text-white font-extrabold text-sm flex items-center justify-center shrink-0">${esc(this.getInitials(st.name))}</div>
                                                <div class="min-w-0 flex-1">
                                                    <h4 class="font-extrabold text-slate-900 text-sm sm:text-base truncate">${idx + 1}. ${esc(st.name)}</h4>
                                                    <span class="text-[11px] text-slate-500">${q.newLogsCount} حفظ • ${q.revLogsCount} مراجعة</span>
                                                </div>
                                                <div class="text-left shrink-0">
                                                    <div class="text-base font-extrabold text-teal-700">${q.quranPct}%</div>
                                                    <div class="text-[10px] text-slate-500">${q.totalCompleted}/114 سورة</div>
                                                </div>
                                            </div>
                                            <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-3">
                                                <div class="bar-fill bg-gradient-to-l from-teal-600 to-emerald-500 h-full rounded-full" style="width: ${q.quranPct}%"></div>
                                            </div>
                                            <div class="grid grid-cols-2 gap-2 text-[11px] font-bold">
                                                <div class="bg-slate-50 rounded-lg px-2 py-1.5 flex justify-between"><span class="text-slate-500">جزء عمّ</span><span class="text-teal-700">${q.ammaCompleted}/${q.ammaTotal}</span></div>
                                                <div class="bg-slate-50 rounded-lg px-2 py-1.5 flex justify-between"><span class="text-slate-500">جزء تبارك</span><span class="text-teal-700">${q.tabarakCompleted}/${q.tabarakTotal}</span></div>
                                            </div>
                                            <div class="mt-3 text-xs">
                                                ${last ? `
                                                    <div class="flex items-center justify-between gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                                                        <span class="truncate"><span class="font-extrabold ${last.sessionType === 'new' ? 'text-emerald-700' : 'text-indigo-700'}">${last.sessionType === 'new' ? 'حفظ:' : 'مراجعة:'}</span>
                                                        <span class="font-bold text-slate-800"> ${esc(last.surahName)} (${last.fromAyah}-${last.toAyah})</span></span>
                                                        <span class="text-[10px] font-extrabold text-emerald-700 shrink-0">${esc(last.rating)}</span>
                                                    </div>
                                                ` : '<div class="text-slate-500 text-center py-2 bg-slate-50 rounded-xl">لم يُسجَّل تسميع بعد</div>'}
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100" onclick="event.stopPropagation()">
                                            <button onclick="app.openStudentQuranDetail('${st.id}'); setTimeout(() => document.getElementById('newMemFormBox')?.scrollIntoView({behavior:'smooth'}), 120);" class="py-1.5 px-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1">
                                                <i class="fa-solid fa-plus-circle"></i><span>حفظ جديد</span>
                                            </button>
                                            <button onclick="app.openStudentQuranDetail('${st.id}'); setTimeout(() => document.getElementById('revMemFormBox')?.scrollIntoView({behavior:'smooth'}), 120);" class="py-1.5 px-2 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center gap-1">
                                                <i class="fa-solid fa-rotate"></i><span>مراجعة</span>
                                            </button>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            },

            surahOptionsHtml(selectedName) {
                const groups = [];
                ALL_SURAHS.forEach(s => {
                    if (!groups[s.juzFrom]) groups[s.juzFrom] = [];
                    groups[s.juzFrom].push(s);
                });
                return groups.map((list, juz) => list && `
                    <optgroup label="الجزء ${juz}">
                        ${list.map(s => `<option value="${esc(s.name)}" data-ayahs="${s.ayahs}" ${s.name === selectedName ? 'selected' : ''}>${s.num}. ${esc(s.name)} (${s.ayahs} آية)</option>`).join('')}
                    </optgroup>
                `).join('');
            },

            quranFormHtml(st, rec, isNew) {
                const prefix = isNew ? 'qNew' : 'qRev';
                const planSurah = isNew ? rec.nextPlan?.newSurah : rec.nextPlan?.revSurah;
                const from = (isNew ? rec.nextPlan?.newFrom : rec.nextPlan?.revFrom) || 1;
                const to = (isNew ? rec.nextPlan?.newTo : rec.nextPlan?.revTo) || 1;
                const max = surahByName(planSurah)?.ayahs || 286;
                const tone = isNew
                    ? { box: 'border-emerald-200', head: 'border-emerald-100', icon: 'bg-emerald-600', btn: 'bg-emerald-600 hover:bg-emerald-700', text: 'text-emerald-700', chip: 'bg-emerald-100 text-emerald-800' }
                    : { box: 'border-indigo-200', head: 'border-indigo-100', icon: 'bg-indigo-600', btn: 'bg-indigo-600 hover:bg-indigo-700', text: 'text-indigo-700', chip: 'bg-indigo-100 text-indigo-800' };
                const field = 'w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold';

                return `
                    <div id="${isNew ? 'newMemFormBox' : 'revMemFormBox'}" class="bg-white rounded-2xl border-2 ${tone.box} p-5 shadow-sm space-y-4">
                        <div class="flex items-center justify-between gap-2 border-b ${tone.head} pb-3">
                            <div class="flex items-center gap-2.5">
                                <div class="w-9 h-9 rounded-xl ${tone.icon} text-white flex items-center justify-center">
                                    <i class="fa-solid ${isNew ? 'fa-seedling' : 'fa-rotate'}"></i>
                                </div>
                                <div>
                                    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base">${isNew ? 'تسميع الحفظ الجديد' : 'تسميع المراجعة'}</h3>
                                    <p class="text-[11px] text-slate-500">${isNew ? 'الخطة تتقدم تلقائيًا بعد كل جلسة' : 'مراجعة المحفوظ وتثبيته'}</p>
                                </div>
                            </div>
                            <span class="text-[11px] font-bold ${tone.chip} px-2.5 py-1 rounded-full">التالي: ${esc(planSurah || '')}</span>
                        </div>

                        <form onsubmit="event.preventDefault(); app.saveQuranSession('${st.id}', '${isNew ? 'new' : 'revision'}');" class="space-y-3">
                            <div>
                                <label for="${prefix}Surah" class="block text-xs font-bold text-slate-700 mb-1">السورة</label>
                                <select id="${prefix}Surah" onchange="app.onQuranSurahSelectChange('${prefix}Surah', '${prefix}ToAyah')" class="${field}">
                                    ${this.surahOptionsHtml(planSurah)}
                                </select>
                            </div>
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                <div>
                                    <label for="${prefix}FromAyah" class="block text-xs font-bold text-slate-700 mb-1">من الآية</label>
                                    <input type="number" id="${prefix}FromAyah" min="1" max="${max}" value="${from}" required class="${field} text-center">
                                </div>
                                <div>
                                    <label for="${prefix}ToAyah" class="block text-xs font-bold text-slate-700 mb-1">إلى الآية</label>
                                    <input type="number" id="${prefix}ToAyah" min="1" max="${max}" value="${to}" required class="${field} text-center">
                                </div>
                                <div class="col-span-2 sm:col-span-1">
                                    <label for="${prefix}Errors" class="block text-xs font-bold text-slate-700 mb-1">الأخطاء</label>
                                    <input type="number" id="${prefix}Errors" min="0" max="200" value="0" class="${field} text-center">
                                </div>
                            </div>
                            <div>
                                <label for="${prefix}Rating" class="block text-xs font-bold text-slate-700 mb-1">التقدير</label>
                                <select id="${prefix}Rating" class="${field} ${tone.text}">
                                    <option value="ممتاز متقن">ممتاز متقن</option>
                                    <option value="جيد جداً">جيد جدًا</option>
                                    <option value="جيد">جيد</option>
                                    <option value="يحتاج إعادة">يحتاج إعادة</option>
                                </select>
                            </div>
                            <input type="text" id="${prefix}Notes" placeholder="${isNew ? 'ملاحظات التجويد والحفظ (اختياري)' : 'ملاحظات المراجعة (اختياري)'}" class="${field} font-normal">
                            <label class="flex items-center gap-2 text-xs font-bold ${tone.text} cursor-pointer">
                                <input type="checkbox" id="${isNew ? 'qNewMarkCompleted' : 'qRevMarkMastered'}" ${isNew ? '' : 'checked'} class="rounded">
                                <span>${isNew ? 'أتمّ الطالب حفظ السورة كاملة' : 'ترقية السورة إلى «متقن»'}</span>
                            </label>
                            <button type="submit" class="w-full py-2.5 rounded-xl ${tone.btn} text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2">
                                <i class="fa-solid fa-check"></i>
                                <span>${isNew ? 'حفظ جلسة الحفظ' : 'حفظ جلسة المراجعة'}</span>
                            </button>
                        </form>
                    </div>
                `;
            },

            renderIndividualStudentQuranPage(cls, st, container) {
                const rec = this.ensureStudentQuranRecord(cls, st.id);
                const qStats = this.getStudentQuranStats(cls, st.id);
                const query = this.quranSurahSearch.trim();
                const juz = this.activeQuranJuz;
                let surahList = juz === 'all' ? ALL_SURAHS : surahsOfJuz(juz);
                if (query) surahList = ALL_SURAHS.filter(s => s.name.includes(query) || String(s.num) === query);

                const statusStyles = {
                    not_started: { label: 'لم يبدأ', cls: 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300', dot: 'bg-slate-300' },
                    in_progress: { label: 'جاري الحفظ', cls: 'bg-amber-50 text-amber-900 border-amber-300 ring-1 ring-amber-200', dot: 'bg-amber-500' },
                    memorized: { label: 'محفوظ', cls: 'bg-emerald-50 text-emerald-900 border-emerald-300', dot: 'bg-emerald-500' },
                    mastered: { label: 'متقن', cls: 'bg-teal-600 !text-white border-teal-700 shadow-sm', dot: 'bg-white' }
                };

                const filteredLogs = (rec.logs || []).filter(l => this.quranLogFilter === 'all' || l.sessionType === this.quranLogFilter);
                const circumference = 2 * Math.PI * 34;
                const juzTitle = query ? `نتائج البحث (${surahList.length})` : (juz === 'all' ? 'القرآن كاملًا' : `الجزء ${juz}`);

                container.innerHTML = `
                    <div class="space-y-6 animate-pop">
                        <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div class="flex items-center gap-3.5 min-w-0">
                                <button onclick="app.closeStudentFile();" aria-label="رجوع إلى الحلقة" class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                                    <i class="fa-solid fa-arrow-right"></i>
                                </button>
                                <div class="w-12 h-12 rounded-2xl ${st.avatarColor} text-white font-extrabold flex items-center justify-center shrink-0">${esc(this.getInitials(st.name))}</div>
                                <div class="min-w-0">
                                    <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 truncate">${esc(st.name)}</h2>
                                    <select aria-label="الانتقال إلى طالب آخر" onchange="app.openStudentQuranDetail(this.value)" class="mt-1 max-w-full bg-slate-100 text-slate-700 font-bold text-xs rounded-lg px-2 py-1 border border-slate-200">
                                        ${cls.students.map(s => `<option value="${s.id}" ${s.id === st.id ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}
                                    </select>
                                </div>
                            </div>
                            <div class="flex items-center gap-4 self-center lg:self-auto">
                                <div class="relative w-20 h-20 shrink-0">
                                    <svg viewBox="0 0 80 80" class="w-20 h-20 -rotate-90" role="img" aria-label="الإنجاز ${qStats.quranPct}%">
                                        <circle cx="40" cy="40" r="34" fill="none" stroke="rgb(var(--bg-slate-200))" stroke-width="7"></circle>
                                        <circle class="ring-progress" cx="40" cy="40" r="34" fill="none" stroke="rgb(var(--bg-teal-600))" stroke-width="7" stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="${circumference * (1 - qStats.quranPct / 100)}"></circle>
                                    </svg>
                                    <div class="absolute inset-0 flex items-center justify-center font-extrabold text-sm text-teal-700">${qStats.quranPct}%</div>
                                </div>
                                <div class="grid grid-cols-2 gap-x-5 gap-y-1 text-xs">
                                    <span class="text-slate-500">السور</span><strong class="text-slate-900">${qStats.totalCompleted} / 114</strong>
                                    <span class="text-slate-500">الآيات</span><strong class="text-slate-900">${qStats.memorizedAyahs} / ${TOTAL_AYAHS}</strong>
                                    <span class="text-slate-500">متقن</span><strong class="text-slate-900">${qStats.masteredCount} سورة</strong>
                                    <span class="text-slate-500">الأجزاء التامة</span><strong class="text-slate-900">${qStats.fullJuzCount} / 30</strong>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            ${this.quranFormHtml(st, rec, true)}
                            ${this.quranFormHtml(st, rec, false)}
                        </div>

                        <div class="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <h3 class="font-extrabold text-slate-900 text-base flex items-center gap-2">
                                        <i class="fa-solid fa-map text-teal-600"></i><span>خريطة القرآن الكريم</span>
                                    </h3>
                                    <p class="text-xs text-slate-500 mt-0.5">اختر جزءًا، ثم اضغط على السورة لتغيير حالتها: لم يبدأ، جاري الحفظ، محفوظ، متقن</p>
                                </div>
                                <div class="relative sm:w-56">
                                    <i class="fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                                    <input id="quranSurahSearchInput" type="text" value="${esc(this.quranSurahSearch)}" oninput="app.onQuranSurahSearch(this.value)" placeholder="ابحث باسم السورة أو رقمها" class="w-full pr-8 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                                </div>
                            </div>

                            <div class="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-[repeat(15,minmax(0,1fr))] gap-1.5" role="group" aria-label="أجزاء القرآن">
                                ${Array.from({ length: 30 }, (_, i) => {
                                    const num = 30 - i;
                                    const pct = qStats.juzProgress[num];
                                    const active = !query && juz === num;
                                    return `
                                        <button onclick="app.setQuranJuz(${num})" title="الجزء ${num}: ${pct}%" aria-label="الجزء ${num}، الإنجاز ${pct}%" class="juz-tile h-10 rounded-lg border text-xs font-extrabold ${active ? 'border-indigo-600 ring-2 ring-indigo-300 text-indigo-800' : 'border-slate-200 text-slate-700 bg-slate-50'}">
                                            <span class="fill" style="height: ${pct}%"></span>${num}
                                        </button>
                                    `;
                                }).join('')}
                            </div>

                            <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
                                <div class="flex flex-wrap items-center gap-1.5">
                                    <span class="font-extrabold text-slate-800 ml-1">${esc(juzTitle)}</span>
                                    <button onclick="app.setQuranJuz('all')" class="px-3 py-1 rounded-lg font-bold ${juz === 'all' && !query ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}">الكل</button>
                                    <button onclick="app.setQuranJuz(30)" class="px-3 py-1 rounded-lg font-bold bg-slate-100 text-slate-700">عمّ ${qStats.ammaCompleted}/${qStats.ammaTotal}</button>
                                    <button onclick="app.setQuranJuz(29)" class="px-3 py-1 rounded-lg font-bold bg-slate-100 text-slate-700">تبارك ${qStats.tabarakCompleted}/${qStats.tabarakTotal}</button>
                                </div>
                                ${!query && juz !== 'all' ? `
                                    <button onclick="app.markAllJuzStatus('${st.id}', ${juz}, 'memorized')" class="font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1 rounded-lg border border-teal-200">تعليم سور الجزء كمحفوظة</button>
                                ` : ''}
                            </div>

                            <div class="flex flex-wrap items-center gap-3 text-[11px] font-bold text-slate-500">
                                ${Object.values(statusStyles).map(s => `<span class="inline-flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full ${s.dot === 'bg-white' ? 'bg-teal-600' : s.dot}"></span>${s.label}</span>`).join('')}
                            </div>

                            ${surahList.length === 0 ? '<p class="text-center text-sm text-slate-500 py-6">لا توجد سورة بهذا الاسم</p>' : `
                                <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
                                    ${surahList.map(surah => {
                                        const stCfg = statusStyles[rec.surahStatus[surah.num]] || statusStyles.not_started;
                                        return `
                                            <div onclick="app.cycleSurahStatus('${st.id}', ${surah.num})" aria-label="سورة ${esc(surah.name)}: ${stCfg.label}" class="p-2.5 rounded-xl border ${stCfg.cls} cursor-pointer transition-all select-none flex flex-col justify-between">
                                                <div class="flex items-center justify-between text-[10px] opacity-80">
                                                    <span class="font-bold">${surah.num}</span>
                                                    <span>${surah.ayahs} آية</span>
                                                </div>
                                                <div class="font-extrabold text-sm my-1 truncate">${esc(surah.name)}</div>
                                                <div class="flex items-center gap-1 text-[10px] font-bold">
                                                    <span class="w-2 h-2 rounded-full ${stCfg.dot}"></span><span>${stCfg.label}</span>
                                                </div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            `}
                        </div>

                        <div class="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <h3 class="font-extrabold text-slate-900 text-base flex items-center gap-2">
                                    <i class="fa-solid fa-clock-rotate-left text-indigo-600"></i>
                                    <span>سجل التسميع (${rec.logs.length})</span>
                                </h3>
                                <div class="flex items-center gap-1.5">
                                    ${[['all', 'الكل'], ['new', 'الحفظ'], ['revision', 'المراجعة']].map(([key, label]) => `
                                        <button onclick="app.quranLogFilter = '${key}'; app.renderClassWorkspace();" class="px-3 py-1 rounded-lg text-xs font-bold ${this.quranLogFilter === key ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}">${label}</button>
                                    `).join('')}
                                </div>
                            </div>
                            ${filteredLogs.length === 0 ? '<p class="text-center text-sm text-slate-500 py-6">لا توجد جلسات مسجلة</p>' : `
                                <div class="space-y-2">
                                    ${filteredLogs.map(log => `
                                        <div class="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                                            <div class="min-w-0">
                                                <div class="text-sm font-extrabold text-slate-800">
                                                    <span class="${log.sessionType === 'new' ? 'text-emerald-700' : 'text-indigo-700'}">${quranTypeLabel(log)}:</span>
                                                    ${esc(log.surahName)} (${log.fromAyah}-${log.toAyah})
                                                </div>
                                                <div class="text-[11px] text-slate-500 mt-0.5">${fmtDate(log.date)}${log.time ? ` • ${log.time}` : ''} • ${esc(log.rating)} • ${log.errors} أخطاء${log.source === 'mushaf' ? ' • من المصحف' : ''}</div>
                                                ${surahByName(log.surahName) ? `<button onclick="app.viewRecitation('${st.id}', '${log.id}')" class="mt-1 text-[11px] font-bold text-indigo-700 underline">عرض في المصحف</button>` : ''}
                                                ${log.tajweedNotes ? `<div class="text-xs text-slate-600 mt-1">${esc(log.tajweedNotes)}</div>` : ''}
                                            </div>
                                            <button onclick="app.deleteQuranLog('${st.id}', '${log.id}')" title="حذف الجلسة" class="text-slate-400 hover:text-rose-600 p-1 shrink-0"><i class="fa-solid fa-trash-can text-xs"></i></button>
                                        </div>
                                    `).join('')}
                                </div>
                            `}
                        </div>
                    </div>
                `;
            },

            setQuranJuz(juz) {
                this.activeQuranJuz = juz;
                this.quranSurahSearch = '';
                this.renderClassWorkspace();
            },

            onQuranSurahSearch(value) {
                this.quranSurahSearch = value;
                this.renderClassWorkspace();
                const input = document.getElementById('quranSurahSearchInput');
                input?.focus();
                input?.setSelectionRange(value.length, value.length);
            },

            onQuranSurahSelectChange(selectId, toInputId) {
                const sel = document.getElementById(selectId);
                const toInp = document.getElementById(toInputId);
                const fromInp = document.getElementById(toInputId.replace('ToAyah', 'FromAyah'));
                if (!sel || !toInp) return;
                const maxAyahs = sel.options[sel.selectedIndex]?.getAttribute('data-ayahs');
                if (maxAyahs) {
                    toInp.value = maxAyahs;
                    toInp.max = maxAyahs;
                    if (fromInp) {
                        fromInp.value = 1;
                        fromInp.max = maxAyahs;
                    }
                }
            },

            /** Surah that follows in the student's direction. Most circles memorize from An-Nas upwards. */
            findNextSurah(rec, surah, wanted) {
                const list = ALL_SURAHS;
                const idx = list.indexOf(surah);
                const isDone = s => ['memorized', 'mastered'].includes(rec.surahStatus[s?.num]);
                const forward = isDone(list[idx - 1]) && !isDone(list[idx + 1]);
                const step = forward ? 1 : -1;
                for (const direction of [step, -step]) {
                    for (let i = idx + direction; i >= 0 && i < list.length; i += direction) {
                        if (wanted(list[i])) return list[i];
                    }
                }
                return surah;
            },

            /** The session after this one: continue the surah, or move on when it is finished. */
            planNextSession(rec, surah, fromAyah, toAyah, isNew) {
                const size = toAyah - fromAyah + 1;
                if (toAyah < surah.ayahs) {
                    return { surah, from: toAyah + 1, to: Math.min(surah.ayahs, toAyah + size) };
                }
                const isDone = s => ['memorized', 'mastered'].includes(rec.surahStatus[s.num]);
                const next = this.findNextSurah(rec, surah, s => (isNew ? !isDone(s) : isDone(s)));
                return { surah: next, from: 1, to: Math.min(next.ayahs, size) };
            },

            cycleSurahStatus(studentId, surahNum) {
                const cls = this.getActiveClass();
                const rec = this.ensureStudentQuranRecord(cls, studentId);
                const order = ['not_started', 'in_progress', 'memorized', 'mastered'];
                const curr = rec.surahStatus[surahNum] || 'not_started';
                const next = order[(order.indexOf(curr) + 1) % order.length];
                rec.surahStatus[surahNum] = next;
                sfx.play('click');
                this.saveData();
                this.renderClassWorkspace();
            },

            markAllJuzStatus(studentId, juzKey, status) {
                const cls = this.getActiveClass();
                const rec = this.ensureStudentQuranRecord(cls, studentId);
                const list = surahsOfJuz(juzKey);
                list.forEach(s => {
                    rec.surahStatus[s.num] = status;
                });
                sfx.play('positive');
                this.saveData();
                this.renderClassWorkspace();
                this.showToast('تم تحديث حالة جميع سور الجزء بنجاح');
            },

            saveQuranSession(studentId, sessionType) {
                const cls = this.getActiveClass();
                const rec = this.ensureStudentQuranRecord(cls, studentId);
                const isNew = sessionType === 'new';

                const surahName = document.getElementById(isNew ? 'qNewSurah' : 'qRevSurah').value;
                const fromAyah = Number(document.getElementById(isNew ? 'qNewFromAyah' : 'qRevFromAyah').value) || 1;
                const toAyah = Number(document.getElementById(isNew ? 'qNewToAyah' : 'qRevToAyah').value) || 1;
                const rating = document.getElementById(isNew ? 'qNewRating' : 'qRevRating').value;
                const errors = Number(document.getElementById(isNew ? 'qNewErrors' : 'qRevErrors').value) || 0;
                const tajweedNotes = document.getElementById(isNew ? 'qNewNotes' : 'qRevNotes').value.trim();

                const foundSurah = surahByName(surahName);

                if (!foundSurah) {
                    this.showToast('اختر سورة من القائمة', 'error');
                    return;
                }
                if (fromAyah < 1 || toAyah > foundSurah.ayahs || fromAyah > toAyah) {
                    this.showToast(`آيات سورة ${surahName} من 1 إلى ${foundSurah.ayahs}، ويجب ألا تتجاوز بداية المقطع نهايته`, 'error');
                    return;
                }
                const repeat = rating === 'يحتاج إعادة';

                if (isNew) {
                    const markDone = document.getElementById('qNewMarkCompleted')?.checked;
                    if (markDone && foundSurah) {
                        rec.surahStatus[foundSurah.num] = rating === 'ممتاز متقن' ? 'mastered' : 'memorized';
                    }
                    const plan = repeat
                        ? { surah: foundSurah, from: fromAyah, to: toAyah }
                        : this.planNextSession(rec, foundSurah, fromAyah, toAyah, true);
                    rec.nextPlan.newSurah = plan.surah.name;
                    rec.nextPlan.newFrom = plan.from;
                    rec.nextPlan.newTo = plan.to;
                } else {
                    const markMastered = document.getElementById('qRevMarkMastered')?.checked;
                    if (markMastered && foundSurah) {
                        rec.surahStatus[foundSurah.num] = 'mastered';
                    }
                    const plan = repeat
                        ? { surah: foundSurah, from: fromAyah, to: toAyah }
                        : this.planNextSession(rec, foundSurah, fromAyah, toAyah, false);
                    rec.nextPlan.revSurah = plan.surah.name;
                    rec.nextPlan.revFrom = plan.from;
                    rec.nextPlan.revTo = plan.to;
                }

                rec.logs.unshift({
                    id: 'qlog_' + Date.now(),
                    date: getTodayStr(0),
                    sessionType,
                    surahName,
                    fromAyah,
                    toAyah,
                    errors,
                    tajweedNotes,
                    rating
                });

                sfx.play('positive');
                this.saveData();
                this.renderClassWorkspace();
                this.showToast(`تم تسجيل ${isNew ? 'الحفظ الجديد' : 'المراجعة'} لسورة ${surahName} بنجاح`);
            },

            deleteQuranLog(studentId, logId) {
                const cls = this.getActiveClass();
                const rec = this.ensureStudentQuranRecord(cls, studentId);
                rec.logs = rec.logs.filter(l => l.id !== logId);
                this.saveData();
                this.renderClassWorkspace();
                this.showToast('تم حذف سجل الجلسة', 'info');
            },

            /* ==========================================
               TAB 5: GRADEBOOK (سجل الدرجات والاختبارات)
               ========================================== */
            gradeSumHtml(stats) {
                if (stats.pct === null) return '<span class="text-slate-400">—</span>';
                const partial = stats.gradedCount < stats.totalAssessments
                    ? `<div class="text-[10px] font-normal text-slate-400">رُصد ${stats.gradedCount} من ${stats.totalAssessments}</div>`
                    : '';
                return `${stats.earned} <span class="text-xs font-normal text-slate-400">/ ${stats.totalMax}</span>${partial}`;
            },

            gradeBadgeHtml(stats) {
                const text = stats.pct === null ? stats.label : `${stats.pct}% • ${stats.label}`;
                return `<span class="px-2.5 py-1 rounded-full text-xs font-bold ${stats.badgeClass}">${esc(text)}</span>`;
            },

            /** Updates only this student's cells, so the teacher can keep typing with Tab. */
            updateStudentScore(studentId, assessmentId, input, maxScore) {
                const cls = this.getActiveClass();
                if (!cls.grades) cls.grades = {};
                if (!cls.grades[studentId]) cls.grades[studentId] = {};

                const rawValue = String(input.value).trim();
                if (rawValue === '') {
                    delete cls.grades[studentId][assessmentId];
                } else {
                    let num = parseFloat(rawValue);
                    if (Number.isNaN(num) || num < 0) num = 0;
                    if (num > maxScore) {
                        num = maxScore;
                        this.showToast(`الدرجة العظمى لهذا التقييم هي ${maxScore}`, 'info');
                    }
                    cls.grades[studentId][assessmentId] = num;
                    input.value = num;
                }

                this.saveData();
                const stats = this.getStudentGradeStats(cls, studentId);
                document.getElementById(`grade_sum_${studentId}`).innerHTML = this.gradeSumHtml(stats);
                document.getElementById(`grade_pct_${studentId}`).innerHTML = this.gradeBadgeHtml(stats);
            },

            confirmDeleteAssessment(assId) {
                const cls = this.getActiveClass();
                const ass = cls.assessments.find(a => a.id === assId);
                if (!ass) return;
                this.openModal('حذف عمود التقييم', `
                    <div class="space-y-4">
                        <p class="text-sm text-slate-600">هل تريد حذف <strong>"${esc(ass.title)}"</strong> ودرجات جميع الطلاب فيه؟</p>
                        <div class="flex justify-end gap-2">
                            <button onclick="app.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">إلغاء</button>
                            <button onclick="app.deleteAssessment('${assId}')" class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold">نعم، احذف العمود</button>
                        </div>
                    </div>
                `);
            },

            deleteAssessment(assId) {
                const cls = this.getActiveClass();
                cls.assessments = cls.assessments.filter(a => a.id !== assId);
                Object.values(cls.grades || {}).forEach(row => delete row[assId]);
                this.saveData();
                this.closeModal();
                this.renderClassWorkspace();
                this.showToast('تم حذف عمود التقييم', 'info');
            },

            /* ==========================================
               TAB 6: INTERACTIVE SEATING CHART (خريطة الجلوس)
               ========================================== */
            startSeatSwap(studentId) {
                sfx.play('click');
                if (this.selectedSwapStudentId === studentId) {
                    this.selectedSwapStudentId = null;
                } else {
                    this.selectedSwapStudentId = studentId;
                }
                this.renderClassWorkspace();
            },

            moveStudentToDesk(targetDeskIdx) {
                const cls = this.getActiveClass();
                const sourceSt = cls.students.find(s => s.id === this.selectedSwapStudentId);
                if (!sourceSt) return;

                const targetSt = cls.students.find(s => s.seatIndex === targetDeskIdx);
                const oldDeskIdx = sourceSt.seatIndex;

                sourceSt.seatIndex = targetDeskIdx;
                if (targetSt && targetSt.id !== sourceSt.id) {
                    targetSt.seatIndex = oldDeskIdx;
                }

                this.selectedSwapStudentId = null;
                sfx.play('positive');
                this.saveData();
                this.renderClassWorkspace();
                this.showToast('تم تحديث مكان جلوس الطالب');
            },

            randomizeSeating() {
                const cls = this.getActiveClass();
                const indices = Array.from({ length: Math.max(15, cls.students.length) }, (_, i) => i);
                for (let i = indices.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [indices[i], indices[j]] = [indices[j], indices[i]];
                }
                cls.students.forEach((st, idx) => {
                    st.seatIndex = indices[idx];
                });
                sfx.play('positive');
                this.saveData();
                this.renderClassWorkspace();
                this.showToast('تم توزيع الطلاب عشوائياً على المقاعد');
            },

            resetSeatingOrder() {
                const cls = this.getActiveClass();
                [...cls.students].sort((x, y) => x.name.localeCompare(y.name, 'ar')).forEach((st, idx) => {
                    st.seatIndex = idx;
                });
                this.saveData();
                this.renderClassWorkspace();
                this.showToast('تم ترتيب المقاعد أبجديًا');
            },

            /* ==========================================
               TAB 7: REPORTS & EXPORT (التقارير والتصدير)
               ========================================== */
            renderReportsTab(cls, container) {
                const attRate = this.getClassAttendanceRate(cls);
                const avgGrade = this.getClassAverageGrade(cls);

                container.innerHTML = `
                    <div class="space-y-6 animate-pop">
                        <!-- Export & Print Actions Bar -->
                        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
                            <div>
                                <h3 class="font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                                    <i class="fa-solid fa-file-export text-indigo-600"></i>
                                    <span>التقارير الشاملة وتصدير البيانات</span>
                                </h3>
                                <p class="text-xs text-slate-500">تصدير كشوفات الحلقة بصيغة Excel (CSV يدعم العربية) أو طباعة تقرير رسمي</p>
                            </div>
                            <div class="flex flex-wrap items-center gap-2">
                                <button onclick="app.exportClassCSV()" class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors">
                                    <i class="fa-solid fa-file-excel"></i>
                                    <span>تصدير لملف Excel (CSV)</span>
                                </button>
                                <button onclick="window.print()" class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors">
                                    <i class="fa-solid fa-print"></i>
                                    <span>طباعة التقرير / PDF</span>
                                </button>
                            </div>
                        </div>

                        <!-- Printable Report Sheet -->
                        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                            <!-- Report Official Header -->
                            <div class="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <div class="text-xs font-bold text-indigo-600">تقرير أداء الحلقة الشامل — مُعلّم كِت</div>
                                    <h2 class="text-xl font-extrabold text-slate-900 mt-0.5">${esc(cls.name)} — ${esc(cls.subject)}</h2>
                                    <p class="text-xs text-slate-500">${esc(cls.room)} | تاريخ التقرير: ${getTodayStr(0)}</p>
                                </div>
                                <div class="flex items-center gap-4 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 text-center">
                                    <div>
                                        <div class="text-[11px] text-slate-500">عدد الطلاب</div>
                                        <div class="font-extrabold text-base text-slate-800">${cls.students.length}</div>
                                    </div>
                                    <div class="border-r border-slate-200 pr-4">
                                        <div class="text-[11px] text-slate-500">متوسط الحضور</div>
                                        <div class="font-extrabold text-base text-emerald-600">${fmtPct(attRate)}</div>
                                    </div>
                                    <div class="border-r border-slate-200 pr-4">
                                        <div class="text-[11px] text-slate-500">متوسط الدرجات</div>
                                        <div class="font-extrabold text-base text-indigo-600">${fmtPct(avgGrade)}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Comprehensive Summary Table -->
                            <div class="overflow-x-auto">
                                <table class="w-full text-right border-collapse text-xs sm:text-sm">
                                    <thead>
                                        <tr class="bg-slate-100 text-slate-700 font-extrabold border-b border-slate-200">
                                            <th class="py-3 px-3">#</th>
                                            <th class="py-3 px-3">اسم الطالب</th>
                                            <th class="py-3 px-3 text-center">أيام الحضور</th>
                                            <th class="py-3 px-3 text-center">أيام الغياب</th>
                                            <th class="py-3 px-3 text-center">نسبة الحضور</th>
                                            <th class="py-3 px-3 text-center">صافي السلوك</th>
                                            <th class="py-3 px-3 text-center">سور جزء عمّ</th>
                                            <th class="py-3 px-3 text-center">سور جزء تبارك</th>
                                            <th class="py-3 px-3 text-center">القرآن كاملًا</th>
                                            <th class="py-3 px-3 text-center">مجموع الدرجات</th>
                                            <th class="py-3 px-3 text-center">النسبة والتقدير</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-200">
                                        ${cls.students.map((st, i) => {
                                            const att = this.getStudentAttendanceStats(cls, st.id);
                                            const beh = this.getStudentBehaviorStats(cls, st.id);
                                            const grd = this.getStudentGradeStats(cls, st.id);
                                            const qur = this.getStudentQuranStats(cls, st.id);

                                            return `
                                                <tr class="hover:bg-slate-50">
                                                    <td class="py-2.5 px-3 font-bold text-slate-400">${i + 1}</td>
                                                    <td class="py-2.5 px-3 font-bold text-slate-900">${esc(st.name)}</td>
                                                    <td class="py-2.5 px-3 text-center text-emerald-700 font-bold">${att.present}</td>
                                                    <td class="py-2.5 px-3 text-center text-rose-600 font-bold">${att.absent}</td>
                                                    <td class="py-2.5 px-3 text-center font-extrabold">${fmtPct(att.rate)}</td>
                                                    <td class="py-2.5 px-3 text-center font-extrabold ${beh.net >= 0 ? 'text-emerald-600' : 'text-rose-600'}">
                                                        ${beh.net > 0 ? `+${beh.net}` : beh.net}
                                                    </td>
                                                    <td class="py-2.5 px-3 text-center font-bold text-teal-700">${qur.ammaCompleted} / ${qur.ammaTotal}</td>
                                                    <td class="py-2.5 px-3 text-center font-bold text-teal-700">${qur.tabarakCompleted} / ${qur.tabarakTotal}</td>
                                                    <td class="py-2.5 px-3 text-center font-bold text-teal-700">${qur.totalCompleted} / 114</td>
                                                    <td class="py-2.5 px-3 text-center font-bold">${grd.pct === null ? '—' : `${grd.earned} / ${grd.totalMax}`}</td>
                                                    <td class="py-2.5 px-3 text-center">
                                                        <span class="px-2 py-0.5 rounded-full text-xs font-bold ${grd.badgeClass}">
                                                            ${grd.pct === null ? grd.label : `${grd.pct}% (${grd.label})`}
                                                        </span>
                                                    </td>
                                                </tr>
                                            `;
                                        }).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
            },

            exportClassCSV() {
                const cls = this.getActiveClass();
                if (!cls) return;

                const headers = [
                    'م',
                    'اسم الطالب',
                    'جوال ولي الأمر',
                    'مرات الحضور',
                    'مرات الغياب',
                    'مرات التأخر',
                    'مرات الاستئذان',
                    'نسبة الحضور %',
                    'نقاط السلوك الإيجابية',
                    'نقاط السلوك السلبية',
                    'صافي السلوك',
                    'سور جزء عم المحفوظة',
                    'سور جزء تبارك المحفوظة',
                    'السور المحفوظة من القرآن',
                    'الآيات المحفوظة',
                    ...cls.assessments.map(a => `${a.title} (${a.maxScore})`),
                    'مجموع الدرجات المرصودة',
                    'من أصل',
                    'النسبة المئوية %',
                    'التقدير العام'
                ].map(csvCell);

                const rows = cls.students.map((st, idx) => {
                    const att = this.getStudentAttendanceStats(cls, st.id);
                    const beh = this.getStudentBehaviorStats(cls, st.id);
                    const grd = this.getStudentGradeStats(cls, st.id);
                    const qur = this.getStudentQuranStats(cls, st.id);
                    const stGrades = (cls.grades || {})[st.id] || {};
                    const graded = grd.pct !== null;

                    return [
                        idx + 1,
                        csvCell(st.name),
                        csvPhone(st.guardianPhone),
                        att.present,
                        att.absent,
                        att.late,
                        att.excused,
                        att.rate === null ? '' : `${att.rate}%`,
                        beh.positive,
                        beh.negative,
                        beh.net,
                        csvCell(`${qur.ammaCompleted} من ${qur.ammaTotal}`),
                        csvCell(`${qur.tabarakCompleted} من ${qur.tabarakTotal}`),
                        csvCell(`${qur.totalCompleted} من 114`),
                        qur.memorizedAyahs,
                        ...cls.assessments.map(a => stGrades[a.id] ?? ''),
                        graded ? grd.earned : '',
                        graded ? grd.totalMax : '',
                        graded ? `${grd.pct}%` : '',
                        csvCell(grd.label)
                    ].join(',');
                });

                const csvContent = `\uFEFF${[headers.join(','), ...rows].join('\r\n')}`;
                this.downloadBlob(csvContent, 'text/csv;charset=utf-8;', `تقرير_${cls.name.replace(/[\s/\\:*?"<>|]+/g, '_')}_${getTodayStr(0)}.csv`);
                this.showToast('تم تحميل ملف Excel (CSV) بنجاح');
            },

            /* ==========================================
               MODALS: STUDENT PROFILE, ADD/EDIT CLASS & STUDENT, CLOUD & DEVICE EXPORT
               ========================================== */
            openModal(title, htmlContent) {
                if (document.getElementById('modalOverlay').classList.contains('hidden')) {
                    this.lastFocused = document.activeElement;
                }
                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalBody').innerHTML = htmlContent;
                const overlay = document.getElementById('modalOverlay');
                overlay.classList.remove('hidden');
                overlay.classList.add('flex');
                const box = document.getElementById('modalBox');
                box.setAttribute('tabindex', '-1');
                box.focus();
            },

            closeModal() {
                const overlay = document.getElementById('modalOverlay');
                overlay.classList.add('hidden');
                overlay.classList.remove('flex');
                if (this.lastFocused?.isConnected) this.lastFocused.focus();
                this.lastFocused = null;
            },

            openStudentProfileModal(studentId) {
                this.openStudentFile(studentId);
            },

            openStudentSummaryModal(studentId) {
                const cls = this.getActiveClass();
                const st = cls.students.find(s => s.id === studentId);
                if (!st) return;

                const att = this.getStudentAttendanceStats(cls, st.id);
                const beh = this.getStudentBehaviorStats(cls, st.id);
                const grd = this.getStudentGradeStats(cls, st.id);
                const qur = this.getStudentQuranStats(cls, st.id);

                this.openModal(`ملف الطالب الشامل: ${st.name}`, `
                    <div class="space-y-5">
                        <!-- Header Info -->
                        <div class="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                            <div class="flex items-center gap-3">
                                ${st.photo ? `<div class="student-photo-box">${this.photoHtml(st)}</div>` : `<div class="w-14 h-14 rounded-2xl ${st.avatarColor} text-white font-extrabold text-lg flex items-center justify-center">
                                    ${esc(this.getInitials(st.name))}
                                </div>`}
                                <div>
                                    <h4 class="font-extrabold text-slate-900 text-base">${esc(st.name)}</h4>
                                    <p class="text-xs text-slate-500">${esc(cls.name)} • ${esc(cls.subject)}</p>
                                    <p class="text-xs text-indigo-600 font-semibold mt-0.5"><i class="fa-solid fa-phone ml-1"></i>ولي الأمر: ${esc(st.guardianPhone || 'غير مسجل')}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <button onclick="app.closeModal(); app.openStudentQuranDetail('${st.id}')" class="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm">
                                    <i class="fa-solid fa-book-quran ml-1"></i> متابعة القرآن
                                </button>
                                <button onclick="app.closeModal(); app.openGiveBehaviorModal(['${st.id}'])" class="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm">
                                    <i class="fa-solid fa-star ml-1"></i> منح نقاط
                                </button>
                            </div>
                        </div>

                        <!-- 4 Pillars Summary -->
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                            <div class="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                                <div class="text-xs text-emerald-800 font-bold">نسبة الحضور</div>
                                <div class="text-xl font-extrabold text-emerald-700 mt-0.5">${fmtPct(att.rate)}</div>
                                <div class="text-[10px] text-emerald-600">حاضر: ${att.present} | غائب: ${att.absent}</div>
                            </div>
                            <div class="p-3 rounded-2xl bg-amber-50 border border-amber-200">
                                <div class="text-xs text-amber-800 font-bold">صافي السلوك</div>
                                <div class="text-xl font-extrabold text-amber-700 mt-0.5">${beh.net > 0 ? `+${beh.net}` : beh.net}</div>
                                <div class="text-[10px] text-amber-700">+${beh.positive} إيجابي | -${beh.negative} سلبي</div>
                            </div>
                            <div class="p-3 rounded-2xl bg-indigo-50 border border-indigo-200">
                                <div class="text-xs text-indigo-800 font-bold">معدل الدرجات</div>
                                <div class="text-xl font-extrabold text-indigo-700 mt-0.5">${fmtPct(grd.pct)}</div>
                                <div class="text-[10px] text-indigo-600">${grd.pct === null ? grd.label : `${grd.earned} من ${grd.totalMax}`}</div>
                            </div>
                            <div class="p-3 rounded-2xl bg-teal-50 border border-teal-200">
                                <div class="text-xs text-teal-800 font-bold">القرآن: ${qur.totalCompleted}/114</div>
                                <div class="text-xl font-extrabold text-teal-700 mt-0.5">${qur.ammaCompleted}/${qur.ammaTotal}</div>
                                <div class="text-[10px] text-teal-600">تبارك: ${qur.tabarakCompleted}/${qur.tabarakTotal}</div>
                            </div>
                        </div>

                        <!-- Grades Breakdown -->
                        <div>
                            <h5 class="text-xs font-extrabold text-slate-700 mb-2">تفصيل درجات التقييمات:</h5>
                            <div class="grid grid-cols-2 gap-2">
                                ${cls.assessments.map(a => {
                                    const score = ((cls.grades || {})[st.id] || {})[a.id] ?? '-';
                                    return `
                                        <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                                            <span class="font-semibold text-slate-700">${esc(a.title)}</span>
                                            <span class="font-extrabold text-indigo-600">${score} / ${a.maxScore}</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>

                        <!-- Recent Behavior Timeline -->
                        <div>
                            <h5 class="text-xs font-extrabold text-slate-700 mb-2">آخر ملاحظات السلوك والمشاركة (${beh.logs.length}):</h5>
                            ${beh.logs.length === 0 ? `<p class="text-xs text-slate-400">لا توجد سجلات سلوكية مسجلة</p>` : `
                                <div class="space-y-1.5 max-h-36 overflow-y-auto">
                                    ${beh.logs.slice().reverse().map(l => `
                                        <div class="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                                            <div>
                                                <span class="font-bold ${l.points > 0 ? 'text-emerald-700' : 'text-rose-600'}">${esc(l.label)} (${l.points > 0 ? `+${l.points}` : l.points})</span>
                                                ${l.note ? `<span class="text-slate-500"> — ${esc(l.note)}</span>` : ''}
                                            </div>
                                            <span class="text-[10px] text-slate-400">${fmtDate(l.date)}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            `}
                        </div>
                    </div>
                `);
                document.getElementById('modalBody').insertAdjacentHTML('afterbegin', this.studentDetailsHtml(st));
            },

            openClassModal(classId = null, focus = '') {
                const existing = classId ? this.data.classes.find(c => c.id === classId) : null;
                const currentTheme = existing ? existing.theme : 'indigo';
                const currentIcon = existing ? existing.icon : 'fa-book-quran';

                this.sessionDraft = (existing?.sessions || []).map(s => ({ ...s }));
                this.classPhotoDraft = existing?.photo || '';
                this.planDraft = JSON.parse(JSON.stringify(existing ? this.planOf(existing) : cleanPlan({ startDate: getTodayStr(0) })));

                const icons = ['fa-book-quran', 'fa-book-quran', 'fa-book-quran', 'fa-language', 'fa-laptop-code', 'fa-earth-americas', 'fa-palette', 'fa-book-open'];

                this.openModal(existing ? 'إعدادات الحلقة' : 'حلقة جديدة', `
                    <form onsubmit="event.preventDefault(); app.saveClassForm('${classId || ''}');" class="space-y-4">
                        <div class="flex items-center gap-3">
                            <div id="clsPhotoPreview" class="student-photo-box flex items-center justify-center bg-slate-100">${this.classPhotoDraft ? `<img src="${esc(this.classPhotoDraft)}" alt="">` : '<i class="fa-regular fa-image text-xl text-slate-400"></i>'}</div>
                            <div class="flex flex-wrap gap-2">
                                <label class="px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold cursor-pointer">
                                    <i class="fa-solid fa-camera ml-1"></i>صورة الحلقة
                                    <input type="file" accept="image/*" onchange="app.onClassPhotoChosen(event)" class="hidden">
                                </label>
                                <button type="button" onclick="app.classPhotoDraft = ''; document.getElementById('clsPhotoPreview').innerHTML = '<i class=&quot;fa-regular fa-image text-xl text-slate-400&quot;></i>';" class="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">حذف الصورة</button>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 mb-1">اسم الحلقة *</label>
                                <input type="text" id="clsNameInput" required value="${esc(existing ? existing.name : '')}" placeholder="مثال: حلقة الفجر" class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 mb-1">وصف الحلقة</label>
                                <input type="text" id="clsSubjectInput" value="${esc(existing ? existing.subject : '')}" placeholder="مثال: القرآن الكريم والتجويد" class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 mb-1">القاعة / الغرفة</label>
                                <input type="text" id="clsRoomInput" value="${esc(existing ? existing.room : '')}" placeholder="مثال: قاعة 205" class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 mb-1">ملاحظة عن الموعد (اختياري)</label>
                                <input type="text" id="clsScheduleInput" value="${esc(existing ? existing.schedule : '')}" placeholder="مثال: الأحد والثلاثاء (حصة 3)" class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                                <label for="clsCodeInput" class="block text-xs font-bold text-slate-700 mb-1">رمز الحلقة</label>
                                <input type="text" id="clsCodeInput" value="${esc(existing?.code || '')}" placeholder="مثال: 6-أ" class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                            </div>
                            <div>
                                <label for="clsTermStart" class="block text-xs font-bold text-slate-700 mb-1">بداية الفترة الدراسية</label>
                                ${this.dateInputHtml('clsTermStart', existing?.termStart)}
                            </div>
                            <div>
                                <label for="clsTermEnd" class="block text-xs font-bold text-slate-700 mb-1">نهاية الفترة الدراسية</label>
                                ${this.dateInputHtml('clsTermEnd', existing?.termEnd)}
                            </div>
                        </div>
                        <div>
                            <label for="clsNotesInput" class="block text-xs font-bold text-slate-700 mb-1">ملاحظات</label>
                            <textarea id="clsNotesInput" rows="2" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">${esc(existing?.notes || '')}</textarea>
                        </div>

                        ${this.scheduleEditorHtml()}

                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1.5">لون الحلقة</label>
                            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                ${Object.entries(CLASS_THEMES).map(([key, th]) => `
                                    <label class="cursor-pointer">
                                        <input type="radio" name="clsThemeRadio" value="${key}" ${key === currentTheme ? 'checked' : ''} class="peer sr-only">
                                        <div class="p-2 rounded-xl border-2 border-slate-200 peer-checked:border-slate-900 flex flex-col items-center gap-1">
                                            <span class="w-6 h-6 rounded-full" style="background:${th.hex}"></span>
                                            <span class="text-[10px] font-bold text-slate-600">${th.name}</span>
                                        </div>
                                    </label>
                                `).join('')}
                            </div>
                        </div>

                        <div class="hidden">
                            <label class="block text-xs font-bold text-slate-700 mb-1.5">أيقونة المادة</label>
                            <div class="grid grid-cols-8 gap-2">
                                ${icons.map(ic => `
                                    <label class="cursor-pointer">
                                        <input type="radio" name="clsIconRadio" value="${ic}" ${ic === currentIcon ? 'checked' : ''} class="peer sr-only">
                                        <div class="h-10 rounded-xl border border-slate-200 peer-checked:bg-indigo-600 peer-checked:text-white flex items-center justify-center text-slate-600 hover:bg-slate-100">
                                            <i class="fa-solid ${ic}"></i>
                                        </div>
                                    </label>
                                `).join('')}
                            </div>
                        </div>

                        <div class="flex flex-wrap justify-between gap-2 pt-3 border-t border-slate-100">
                            ${existing ? `<button type="button" onclick="app.confirmTrashClass('${existing.id}')" class="px-4 py-2 rounded-xl bg-white border border-rose-300 text-rose-700 text-xs font-bold"><span class="mac-trash ml-1" aria-hidden="true"></span>نقل الحلقة إلى سلة المهملات</button>` : '<span></span>'}
                            <div class="flex gap-2">
                            <button type="button" onclick="app.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">إلغاء</button>
                            <button type="submit" class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold">حفظ الحلقة</button>
                        </div>
                        </div>
                    </form>
                `);
                if (focus === 'schedule') setTimeout(() => document.getElementById('scheduleEditor')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
            },

            saveClassForm(classId) {
                const name = document.getElementById('clsNameInput').value.trim();
                const subject = document.getElementById('clsSubjectInput').value.trim();
                const room = document.getElementById('clsRoomInput').value.trim();
                const schedule = document.getElementById('clsScheduleInput').value.trim();
                const theme = document.querySelector('input[name="clsThemeRadio"]:checked')?.value || 'indigo';
                const icon = document.querySelector('input[name="clsIconRadio"]:checked')?.value || 'fa-book-open';
                this.capturePlanDraft();
                const plan = cleanPlan(this.planDraft);
                if (document.getElementById('planStartInput')?.value.trim() && !parseDMY(document.getElementById('planStartInput').value)) {
                    this.showToast('تاريخ بداية الجدول: اكتبه بالشكل يوم/شهر/سنة', 'error');
                    return;
                }
                if (plan.type === 'monthly' && plan.monthly.mode === 'weekday' && !this.planDraft.monthly.weeks.length) {
                    this.showToast('اختر أسبوعًا واحدًا على الأقل من الشهر', 'error');
                    return;
                }
                if (plan.type === 'monthly' && plan.monthly.mode === 'dates' && !this.planDraft.monthly.days.length) {
                    this.showToast('اكتب يومًا واحدًا على الأقل من أيام الشهر', 'error');
                    return;
                }
                const invalidSession = plan.type === 'weekly' && this.sessionDraft.find(s => !s.start || !s.end || s.start >= s.end);
                if (invalidSession) {
                    this.showToast(`موعد ${WEEK_DAYS[invalidSession.day]}: يجب أن تكون البداية قبل النهاية`, 'error');
                    return;
                }
                const sessions = cleanSessions(this.sessionDraft);
                const termStart = this.readDateInput('clsTermStart', 'بداية الفترة الدراسية');
                const termEnd = this.readDateInput('clsTermEnd', 'نهاية الفترة الدراسية');
                if (termStart === null || termEnd === null) return;
                const extra = {
                    code: document.getElementById('clsCodeInput').value.trim(),
                    notes: document.getElementById('clsNotesInput').value.trim(),
                    termStart,
                    termEnd,
                    photo: this.classPhotoDraft,
                    schedulePlan: plan
                };
                if (extra.termStart && extra.termEnd && extra.termStart > extra.termEnd) {
                    this.showToast('بداية الفترة الدراسية يجب أن تسبق نهايتها', 'error');
                    return;
                }

                if (classId) {
                    const cls = this.data.classes.find(c => c.id === classId);
                    if (cls) {
                        Object.assign(cls, { name, subject, room, schedule, theme, icon, sessions, ...extra });
                    }
                    this.showToast('تم تحديث بيانات الحلقة');
                } else {
                    const newCls = {
                        id: 'cls_' + Date.now(),
                        name,
                        subject,
                        room,
                        schedule,
                        theme,
                        icon,
                        students: [],
                        attendance: {},
                        behaviorLogs: [],
                        assessments: [
                            { id: 'ass_1', title: 'اختبار الحفظ الشهري', maxScore: 20 },
                            { id: 'ass_2', title: 'التجويد والأداء', maxScore: 20 },
                            { id: 'ass_3', title: 'الاختبار الختامي', maxScore: 60 }
                        ],
                        grades: {},
                        quranRecords: {},
                        archivedStudents: [],
                        categories: [],
                        sessions,
                        ...extra
                    };
                    this.data.classes.push(newCls);
                    this.showToast('تم إنشاء الحلقة بنجاح');
                }

                this.saveData();
                this.closeModal();
                if (this.activeClassId) this.renderClassWorkspace();
                else if (document.getElementById('scheduleView').classList.contains('hidden')) this.renderDashboard();
                else this.renderSchedule();
            },

            confirmDeleteClass(classId) {
                const cls = this.data.classes.find(c => c.id === classId);
                if (!cls) return;
                this.openModal('حذف الحلقة نهائيًا', `
                    <div class="space-y-4">
                        <p class="text-sm text-slate-600">سيُحذف نهائيًا كل ما في حلقة <strong>"${esc(cls.name)}"</strong> وكافة سجلات الطلاب والحضور والدرجات المرتبطة به؟</p>
                        <div class="flex justify-end gap-2">
                            <button onclick="app.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">تراجع</button>
                            <button onclick="app.deleteClass('${classId}')" class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold">نعم، احذف نهائيًا</button>
                        </div>
                    </div>
                `);
            },

            deleteClass(classId) {
                this.data.classes = this.data.classes.filter(c => c.id !== classId);
                this.saveData();
                this.closeModal();
                this.showDashboard();
                this.showToast('تم حذف الحلقة نهائيًا', 'info');
            },

            openStudentModal(studentId = null) {
                const cls = this.getActiveClass();
                const existing = studentId ? cls.students.find(s => s.id === studentId) : null;
                this.studentPhotoDraft = existing?.photo || '';

                this.openModal(existing ? 'تعديل بيانات الطالب' : 'إضافة طالب جديد للحلقة', `
                    <form onsubmit="event.preventDefault(); app.saveStudentForm('${studentId || ''}');" class="space-y-4">
                        <div class="flex items-center gap-3">
                            <div id="stuPhotoPreview" class="student-photo-box">${this.photoHtml({ photo: this.studentPhotoDraft })}</div>
                            <div class="flex flex-wrap gap-2">
                                <label class="px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold cursor-pointer">
                                    <i class="fa-solid fa-camera ml-1"></i>صورة الطالب
                                    <input type="file" accept="image/*" capture="environment" onchange="app.onStudentPhotoChosen(event)" class="hidden">
                                </label>
                                <button type="button" onclick="app.removeStudentPhoto()" class="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">حذف الصورة</button>
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">اسم الطالب الثلاثي *</label>
                            <input type="text" id="stuNameInput" required value="${esc(existing ? existing.name : '')}" placeholder="مثال: عبدالرحمن محمد الشهري" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">رقم جوال ولي الأمر</label>
                            <input type="text" id="stuPhoneInput" value="${esc(existing ? existing.guardianPhone || '' : '')}" placeholder="05XXXXXXXX" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">ملاحظات تربوية أو صحية (اختياري)</label>
                            <input type="text" id="stuNotesInput" value="${esc(existing ? existing.notes || '' : '')}" placeholder="مثال: يحتاج متابعة في المخارج..." class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        </div>
                        ${this.studentFieldsFormHtml(existing)}
                        <div class="flex justify-end gap-2 pt-2">
                            <button type="button" onclick="app.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">إلغاء</button>
                            <button type="submit" class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold">حفظ بيانات الطالب</button>
                        </div>
                    </form>
                `);
            },

            nextFreeSeat(cls) {
                const taken = new Set(cls.students.map(st => st.seatIndex));
                let seat = 0;
                while (taken.has(seat)) seat++;
                return seat;
            },

            saveStudentForm(studentId) {
                const cls = this.getActiveClass();
                const name = document.getElementById('stuNameInput').value.trim();
                const guardianPhone = document.getElementById('stuPhoneInput').value.trim();
                const notes = document.getElementById('stuNotesInput').value.trim();
                const extra = this.readStudentExtraFields();

                if (studentId) {
                    const st = cls.students.find(s => s.id === studentId);
                    if (st) Object.assign(st, { name, guardianPhone, notes, photo: this.studentPhotoDraft, ...extra });
                    this.showToast('تم تحديث بيانات الطالب');
                } else {
                    const newSt = {
                        id: 'stu_' + Date.now(),
                        name,
                        guardianPhone,
                        notes,
                        photo: this.studentPhotoDraft,
                        ...extra,
                        avatarColor: AVATAR_COLORS[cls.students.length % AVATAR_COLORS.length],
                        seatIndex: this.nextFreeSeat(cls)
                    };
                    cls.students.push(newSt);
                    this.showToast('تمت إضافة الطالب بنجاح');
                }

                this.saveData();
                this.closeModal();
                this.renderClassWorkspace();
            },

            openBulkStudentsModal() {
                this.openModal('إضافة قائمة طلاب دفعة واحدة', `
                    <form onsubmit="event.preventDefault(); app.saveBulkStudents();" class="space-y-4">
                        <p class="text-xs text-slate-500">الصق قائمة أسماء الطلاب هنا (اسم كل طالب في سطر مستقل):</p>
                        <textarea id="bulkStudentsTextarea" rows="7" required placeholder="محمد أحمد العلي&#10;خالد سعد الدوسري&#10;فهد عبدالعزيز القحطاني" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                        <div class="flex justify-end gap-2">
                            <button type="button" onclick="app.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">إلغاء</button>
                            <button type="submit" class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold">إضافة جميع الأسماء</button>
                        </div>
                    </form>
                `);
            },

            saveBulkStudents() {
                const cls = this.getActiveClass();
                const raw = document.getElementById('bulkStudentsTextarea').value;
                const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
                if (!lines.length) return;

                lines.forEach((name, idx) => {
                    cls.students.push({
                        id: 'stu_' + Date.now() + '_' + idx,
                        name,
                        guardianPhone: '',
                        notes: '',
                        avatarColor: AVATAR_COLORS[cls.students.length % AVATAR_COLORS.length],
                        seatIndex: this.nextFreeSeat(cls)
                    });
                });

                this.saveData();
                this.closeModal();
                this.renderClassWorkspace();
                this.showToast(`تمت إضافة ${lines.length} طلاب بنجاح`);
            },

            confirmDeleteStudent(studentId) {
                const cls = this.getActiveClass();
                const st = cls.students.find(s => s.id === studentId);
                if (!st) return;

                this.openModal('إخراج طالب من الحلقة', `
                    <div class="space-y-4">
                        <p class="text-sm text-slate-600">ماذا تريد أن تفعل بالطالب <strong>"${esc(st.name)}"</strong>؟ الأرشفة تخرجه من الحلقة وتحتفظ بكل سجلاته، أما الحذف فيمسح درجاته وحضوره وسلوكه ومتابعته القرآنية.</p>
                        <div class="flex flex-wrap justify-end gap-2">
                            <button onclick="app.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">إلغاء</button>
                            <button onclick="app.deleteStudent('${studentId}')" class="px-4 py-2 rounded-xl bg-white border border-rose-300 text-rose-700 text-xs font-bold">حذف نهائي</button>
                            <button onclick="app.archiveStudent('${studentId}')" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold">أرشفة الطالب</button>
                        </div>
                    </div>
                `);
            },

            purgeStudentRecords(cls, studentId) {
                delete (cls.grades || {})[studentId];
                delete (cls.quranRecords || {})[studentId];
                Object.values(cls.attendance || {}).forEach(day => delete day[studentId]);
                cls.behaviorLogs = (cls.behaviorLogs || []).filter(l => l.studentId !== studentId);
            },

            deleteStudent(studentId) {
                const cls = this.getActiveClass();
                cls.students = cls.students.filter(s => s.id !== studentId);
                this.purgeStudentRecords(cls, studentId);
                this.saveData();
                this.closeModal();
                this.renderClassWorkspace();
                this.showToast('تم حذف الطالب وسجلاته', 'info');
            },

            archiveStudent(studentId) {
                const cls = this.getActiveClass();
                const st = cls.students.find(s => s.id === studentId);
                if (!st) return;
                cls.students = cls.students.filter(s => s.id !== studentId);
                cls.archivedStudents = [...(cls.archivedStudents || []), st];
                this.saveData();
                this.closeModal();
                this.renderClassWorkspace();
                this.showToast('تمت أرشفة الطالب مع الاحتفاظ بسجلاته', 'info');
            },

            restoreStudent(studentId) {
                const cls = this.getActiveClass();
                const st = (cls.archivedStudents || []).find(s => s.id === studentId);
                if (!st) return;
                cls.archivedStudents = cls.archivedStudents.filter(s => s.id !== studentId);
                st.seatIndex = this.nextFreeSeat(cls);
                cls.students.push(st);
                this.saveData();
                this.renderClassWorkspace();
                this.showToast('تمت استعادة الطالب إلى الحلقة');
            },

            confirmPurgeArchivedStudent(studentId) {
                const cls = this.getActiveClass();
                const st = (cls.archivedStudents || []).find(s => s.id === studentId);
                if (!st) return;
                this.openModal('حذف نهائي', `
                    <div class="space-y-4">
                        <p class="text-sm text-slate-600">سيُحذف <strong>"${esc(st.name)}"</strong> وكل سجلاته نهائيًا.</p>
                        <div class="flex justify-end gap-2">
                            <button onclick="app.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">إلغاء</button>
                            <button onclick="app.purgeArchivedStudent('${studentId}')" class="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold">نعم، احذف نهائيًا</button>
                        </div>
                    </div>
                `);
            },

            purgeArchivedStudent(studentId) {
                const cls = this.getActiveClass();
                cls.archivedStudents = (cls.archivedStudents || []).filter(s => s.id !== studentId);
                this.purgeStudentRecords(cls, studentId);
                this.saveData();
                this.closeModal();
                this.renderClassWorkspace();
                this.showToast('تم الحذف النهائي', 'info');
            },

            /* ==========================================
               SETTINGS, GOOGLE CLOUD SYNC & DEVICE TRANSFER MODAL
               ========================================== */
            openSettingsModal() {
                const snapshots = this.readSnapshots();
                const steps = [
                    'افتح ملف <b>Google Sheets</b> خاصًا بك، ثم اختر <b>Extensions &gt; Apps Script</b>.',
                    'امسح الكود الموجود، والصق الكود أدناه ثم احفظ.',
                    'شغّل الدالة <b>setupToken</b> مرة واحدة، وانسخ الرمز من سجل التنفيذ (Execution log).',
                    'اختر <b>Deploy &gt; New deployment &gt; Web app</b>، واجعل Execute as: <b>Me</b> و Who has access: <b>Anyone</b>، ثم انسخ الرابط.',
                    'ألصق الرابط والرمز أعلاه واضغط «حفظ الربط». لا تشاركهما مع أحد؛ الرمز هو ما يحمي بياناتك.'
                ];

                this.openModal('الإعدادات والحساب ونقل البيانات', `
                    <div class="space-y-5">
                        <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-3">
                            <h4 class="text-xs sm:text-sm font-extrabold text-indigo-950 flex items-center gap-2">
                                <i class="fa-solid fa-circle-user text-indigo-600"></i>
                                <span>حسابي (اختياري)</span>
                            </h4>
                            ${this.accountSectionHtml()}
                        </div>
                        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                            <h4 class="text-xs sm:text-sm font-extrabold text-slate-800 flex items-center gap-2">
                                <i class="fa-solid fa-circle-half-stroke text-indigo-600"></i>
                                <span>المظهر</span>
                            </h4>
                            <div class="grid grid-cols-3 gap-2">
                                ${[['auto', 'تلقائي'], ['light', 'نهاري'], ['dark', 'ليلي']].map(([mode, label]) => `
                                    <button data-theme-choice="${mode}" onclick="app.setThemeMode('${mode}')" class="p-2 rounded-xl text-xs font-bold ${this.themeMode === mode ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}">${label}</button>
                                `).join('')}
                            </div>
                            <p class="text-[11px] text-slate-500">التلقائي: ليلي من السابعة مساءً حتى السادسة صباحًا.</p>
                        </div>

                        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                            <h4 class="text-xs sm:text-sm font-extrabold text-slate-800 flex items-center gap-2">
                                <i class="fa-solid fa-sliders text-indigo-600"></i>
                                <span>تخصيص التطبيق</span>
                            </h4>
                            <div class="grid grid-cols-2 gap-2">
                                ${[
                                    ['fa-user-check', 'أنواع الحضور', "app.openCustomizeModal('attendance')"],
                                    ['fa-star', 'أنواع السلوك', "app.openCustomizeModal('behavior')"],
                                    ['fa-award', 'مستويات التقدير', "app.openCustomizeModal('levels')"],
                                    ['fa-id-card', 'حقول الطالب', "app.openCustomizeModal('fields')"],
                                    ['fa-lock', this.settings().passcodeHash ? 'رمز الدخول (مفعّل)' : 'رمز الدخول', 'app.openPasscodeModal()'],
                                    ['fa-box-archive', `أرشيف الحلقات (${this.data.classes.filter(c => c.archived && !c.deletedAt).length})`, 'app.openArchiveModal()'],
                                    ['fa-trash-can', `سلة المهملات (${this.data.classes.filter(c => c.deletedAt).length})`, 'app.openTrashModal()']
                                ].map(([icon, label, action]) => `
                                    <button onclick="${action}" class="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2">${icon === 'fa-trash-can' ? '<span class="mac-trash" aria-hidden="true"></span>' : `<i class="fa-solid ${icon} text-indigo-600"></i>`}<span>${label}</span></button>
                                `).join('')}
                            </div>
                        </div>

                        <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2.5">
                            <h4 class="text-xs sm:text-sm font-extrabold text-emerald-900 flex items-center gap-2">
                                <i class="fa-solid fa-hard-drive text-emerald-600"></i>
                                <span>1. الحفظ على جهازك</span>
                            </h4>
                            <p class="text-xs text-emerald-800 leading-relaxed">
                                يُحفظ كل تعديل في ذاكرة هذا المتصفح فقط، وقد يزول إذا مُسحت بيانات المتصفح. احفظ نسخة في مجلد على جهازك بانتظام.
                            </p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                <button onclick="app.saveFileToDeviceFolder()" class="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2">
                                    <i class="fa-solid fa-folder-open"></i>
                                    <span>حفظ بياناتي في مجلد على الجهاز</span>
                                </button>
                                <button onclick="app.downloadCleanAppFile()" class="p-2.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
                                    <i class="fa-solid fa-file-code"></i>
                                    <span>تحميل نسخة نظيفة من التطبيق (بدون بيانات)</span>
                                </button>
                            </div>
                        </div>

                        <div class="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
                            <div class="flex items-center justify-between gap-2">
                                <h4 class="text-xs sm:text-sm font-extrabold text-indigo-950 flex items-center gap-2">
                                    <i class="fa-brands fa-google-drive text-indigo-600 text-base"></i>
                                    <span>2. الربط عبر Google Sheets (طريقة بديلة)</span>
                                </h4>
                                <label class="flex items-center gap-1.5 text-xs font-bold text-indigo-800 cursor-pointer">
                                    <input type="checkbox" id="autoCloudSyncCheck" ${this.autoCloudSync ? 'checked' : ''} onchange="app.toggleAutoCloudSync(this.checked)" class="rounded text-indigo-600">
                                    <span>مزامنة تلقائية</span>
                                </label>
                            </div>
                            <p id="cloudStatusLine" class="text-xs font-bold text-slate-700">${esc(this.cloudStatusText())}</p>
                            <div class="space-y-2">
                                <input type="url" id="googleCloudUrlInput" dir="ltr" aria-label="رابط Google Apps Script" value="${esc(this.googleScriptUrl)}" placeholder="https://script.google.com/macros/s/......./exec" class="w-full px-3 py-2 bg-white border border-indigo-200 rounded-xl text-xs">
                                <input type="password" id="googleCloudTokenInput" dir="ltr" autocomplete="off" aria-label="رمز المزامنة" value="${esc(this.cloudToken)}" placeholder="رمز المزامنة (SYNC TOKEN)" class="w-full px-3 py-2 bg-white border border-indigo-200 rounded-xl text-xs">
                                <button onclick="app.saveCloudSettings()" class="w-full px-3 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">حفظ الربط</button>
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <button onclick="app.syncToGoogleCloud(false)" class="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2">
                                    <i class="fa-solid fa-cloud-arrow-up"></i>
                                    <span>رفع إلى السحابة</span>
                                </button>
                                <button onclick="app.pullFromGoogleCloud()" class="p-2.5 rounded-xl bg-white hover:bg-indigo-100 text-indigo-700 border border-indigo-300 text-xs font-bold flex items-center justify-center gap-2">
                                    <i class="fa-solid fa-cloud-arrow-down"></i>
                                    <span>استرجاع من السحابة</span>
                                </button>
                            </div>
                            <details class="text-xs bg-white/80 rounded-xl p-2.5 border border-indigo-100">
                                <summary class="font-bold text-indigo-700 cursor-pointer">طريقة إعداد الربط الآمن (مطلوبة أيضًا لمن ربط النسخة القديمة)</summary>
                                <div class="mt-2 space-y-2 text-slate-600 leading-relaxed">
                                    ${steps.map((step, i) => `<p>${i + 1}. ${step}</p>`).join('')}
                                    <button onclick="app.copyAppsScriptCode()" class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold">نسخ الكود</button>
                                    <pre class="bg-slate-900 text-emerald-400 p-2.5 rounded-lg text-[10px] max-h-48 overflow-auto text-left" dir="ltr">${esc(APPS_SCRIPT_CODE)}</pre>
                                </div>
                            </details>
                        </div>

                        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                            <h4 class="text-xs sm:text-sm font-extrabold text-slate-800 flex items-center gap-2">
                                <i class="fa-solid fa-right-left text-purple-600"></i>
                                <span>3. نقل البيانات إلى جهاز آخر</span>
                            </h4>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <button onclick="app.downloadBackupJSON()" class="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2">
                                    <i class="fa-solid fa-download"></i>
                                    <span>تصدير ملف البيانات (JSON)</span>
                                </button>
                                <label class="p-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer">
                                    <i class="fa-solid fa-upload"></i>
                                    <span>استيراد ملف بيانات</span>
                                    <input type="file" accept=".json" onchange="app.importBackupJSON(event)" class="hidden">
                                </label>
                            </div>
                            <details class="text-xs">
                                <summary class="font-bold text-indigo-600 cursor-pointer">النقل برمز نصي</summary>
                                <div class="mt-2 space-y-2">
                                    <button onclick="app.copyTransferCode()" class="font-bold text-indigo-600 hover:underline flex items-center gap-1">
                                        <i class="fa-regular fa-copy"></i>
                                        <span>نسخ رمز البيانات من هذا الجهاز</span>
                                    </button>
                                    <p class="text-rose-700">يحتوي الرمز على بيانات الطلاب وأرقام أولياء الأمور؛ لا تُرسله إلا إلى جهازك.</p>
                                    <textarea id="transferCodeInput" rows="3" dir="ltr" aria-label="لصق رمز البيانات" placeholder="ألصق الرمز هنا على الجهاز الآخر" class="w-full p-2 border border-slate-300 rounded-xl"></textarea>
                                    <button onclick="app.importTransferCode()" class="px-3 py-1.5 rounded-lg bg-slate-800 text-white font-bold">استيراد الرمز</button>
                                </div>
                            </details>
                        </div>

                        <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                            <h4 class="text-xs sm:text-sm font-extrabold text-amber-900 flex items-center gap-2">
                                <i class="fa-solid fa-clock-rotate-left"></i>
                                <span>4. النسخ التلقائية على هذا الجهاز</span>
                            </h4>
                            ${snapshots.length === 0 ? '<p class="text-xs text-amber-800">لا توجد نسخ بعد.</p>' : snapshots.map((snap, idx) => `
                                <div class="flex items-center justify-between gap-2 text-xs bg-white/80 rounded-xl p-2 border border-amber-100">
                                    <span class="text-slate-700">${esc(this.formatDateTime(snap.at))} — ${esc(snap.reason)}</span>
                                    <button onclick="app.restoreSnapshot(${idx})" class="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-bold shrink-0">استعادة</button>
                                </div>
                            `).join('')}
                        </div>

                        <div class="p-4 rounded-2xl border border-rose-200 space-y-2">
                            <h4 class="text-xs sm:text-sm font-extrabold text-rose-800">منطقة خطرة</h4>
                            <button onclick="app.openResetModal()" class="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1">
                                <i class="fa-solid fa-rotate"></i>
                                <span>استبدال كل بياناتي بالبيانات التجريبية</span>
                            </button>
                        </div>
                    </div>
                `);
            },

            formatDateTime(iso) {
                const date = new Date(iso);
                if (Number.isNaN(date.getTime())) return 'غير معروف';
                return `${fmtDate(dateToIso(date))} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            },

            /* ==========================================
               SNAPSHOTS: AUTOMATIC COPIES ON THIS DEVICE
               ========================================== */
            readSnapshots() {
                try {
                    const list = JSON.parse(localStorage.getItem(this.SNAPSHOT_KEY) || '[]');
                    return Array.isArray(list) ? list : [];
                } catch (e) {
                    return [];
                }
            },

            saveSnapshot(reason) {
                const list = this.readSnapshots();
                list.unshift({ at: new Date().toISOString(), reason, payload: JSON.stringify(this.data) });
                list.length = Math.min(list.length, MAX_SNAPSHOTS);
                while (list.length) {
                    try {
                        localStorage.setItem(this.SNAPSHOT_KEY, JSON.stringify(list));
                        return true;
                    } catch (e) {
                        // Browser storage is full: drop the oldest copy and try again.
                        list.pop();
                    }
                }
                return false;
            },

            takeDailySnapshot() {
                const last = this.readSnapshots()[0];
                const ageHours = last ? (Date.now() - new Date(last.at).getTime()) / 3600000 : Infinity;
                if (ageHours >= DAILY_SNAPSHOT_HOURS) this.saveSnapshot('نسخة يومية');
            },

            restoreSnapshot(index) {
                const snap = this.readSnapshots()[index];
                if (!snap) return;
                try {
                    this.confirmReplaceData(sanitizeData(JSON.parse(snap.payload)), `نسخة ${this.formatDateTime(snap.at)}`);
                } catch (e) {
                    this.showToast('هذه النسخة تالفة ولا يمكن استعادتها', 'error');
                }
            },

            /** Every full replacement of the data passes through here. */
            confirmReplaceData(incoming, sourceLabel, onApplied = null) {
                this.pendingReplace = { incoming, sourceLabel, onApplied };
                const count = data => ({
                    classes: data.classes.length,
                    students: data.classes.reduce((sum, c) => sum + c.students.length, 0),
                    updated: data.lastUpdated ? this.formatDateTime(data.lastUpdated) : 'غير معروف'
                });
                const now = count(this.data);
                const next = count(incoming);
                this.openModal('تأكيد استبدال البيانات', `
                    <div class="space-y-4 text-sm text-slate-700">
                        <p>ستحل بيانات <strong>${esc(sourceLabel)}</strong> محل كل البيانات الحالية. ستُحفظ نسخة من بياناتك الحالية تلقائيًا أولًا.</p>
                        <table class="w-full text-xs text-right border border-slate-200">
                            <thead class="bg-slate-50"><tr><th class="p-2"></th><th class="p-2">الحالية</th><th class="p-2">الجديدة</th></tr></thead>
                            <tbody>
                                <tr class="border-t"><th class="p-2">الفصول</th><td class="p-2">${now.classes}</td><td class="p-2">${next.classes}</td></tr>
                                <tr class="border-t"><th class="p-2">الطلاب</th><td class="p-2">${now.students}</td><td class="p-2">${next.students}</td></tr>
                                <tr class="border-t"><th class="p-2">آخر تعديل</th><td class="p-2">${esc(now.updated)}</td><td class="p-2">${esc(next.updated)}</td></tr>
                            </tbody>
                        </table>
                        <div class="flex justify-end gap-2">
                            <button onclick="app.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">تراجع</button>
                            <button id="confirmReplaceBtn" onclick="app.applyPendingReplace()" class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold">نعم، استبدل البيانات</button>
                        </div>
                    </div>
                `);
            },

            applyPendingReplace() {
                const pending = this.pendingReplace;
                if (!pending) return;
                if (!this.saveSnapshot(`قبل الاستبدال بـ ${pending.sourceLabel}`)) {
                    this.showToast('تعذر حفظ نسخة احتياطية، صدّر ملف JSON أولًا ثم أعد المحاولة', 'error');
                    return;
                }
                this.pendingReplace = null;
                this.data = pending.incoming;
                this.saveData(true);
                localStorage.setItem(this.ACCOUNT_DIRTY_KEY, 'true');
                this.scheduleAccountSync();
                pending.onApplied?.();
                this.closeModal();
                this.showDashboard();
                sfx.play('positive');
                this.showToast('تم استبدال البيانات، وحُفظت نسختك السابقة في «النسخ التلقائية»');
            },

            /* ==========================================
               GOOGLE CLOUD SYNC
               ========================================== */
            isValidCloudUrl(url) {
                if (IS_TEST_BUILD && /^http:\/\/127\.0\.0\.1:\d+\/exec$/.test(url)) return true;
                return /^https:\/\/script\.google\.com\/(a\/[\w.-]+\/)?macros\/s\/[\w-]+\/exec$/.test(url)
                    || /^https:\/\/script\.google\.com\/a\/macros\/[\w.-]+\/s\/[\w-]+\/exec$/.test(url);
            },

            cloudReady() {
                return Boolean(this.googleScriptUrl && this.cloudToken);
            },

            cloudStatusText() {
                if (!this.googleScriptUrl) return 'غير مربوط بالسحابة';
                if (!this.cloudToken) return 'الربط غير مكتمل: أدخل رمز المزامنة';
                const last = this.cloudLastSync ? this.formatDateTime(this.cloudLastSync) : 'لم تتم بعد';
                switch (this.cloudStatus) {
                    case 'syncing': return 'جاري الرفع إلى السحابة...';
                    case 'conflict': return 'المزامنة متوقفة: البيانات السحابية تغيّرت من جهاز آخر';
                    case 'needs_update': return 'المزامنة متوقفة: هذا الرابط يستخدم السكربت القديم، أعد الإعداد بالخطوات أدناه';
                    case 'error': return `فشلت آخر مزامنة (${this.cloudErrorText(this.cloudLastError)}). آخر نجاح: ${last}`;
                    default: return localStorage.getItem(this.CLOUD_DIRTY_KEY) === 'true'
                        ? `توجد تعديلات لم تُرفع بعد. آخر مزامنة ناجحة: ${last}`
                        : `آخر مزامنة ناجحة: ${last}`;
                }
            },

            cloudErrorText(code) {
                return {
                    old_script: 'هذا الرابط يستخدم السكربت القديم غير الآمن',
                    unauthorized: 'رمز المزامنة غير صحيح',
                    token_not_configured: 'لم يُشغَّل setupToken في السكربت',
                    verify_failed: 'لم تتطابق البيانات المحفوظة مع المرسلة',
                    bad_payload: 'رفض السكربت البيانات',
                    busy: 'السكربت مشغول، أعد المحاولة',
                    server_error: 'خطأ من جهة Google',
                    network: 'تعذر الاتصال، تحقق من الإنترنت والرابط'
                }[code] || 'رد غير متوقع من السكربت';
            },

            setCloudStatus(status, error = '') {
                this.cloudStatus = status;
                this.cloudLastError = error;
                this.updateCloudFooterBadge();
                const line = document.getElementById('cloudStatusLine');
                if (line) line.textContent = this.cloudStatusText();
            },

            saveCloudSettings() {
                const url = (document.getElementById('googleCloudUrlInput')?.value || '').trim();
                const token = (document.getElementById('googleCloudTokenInput')?.value || '').trim();
                if (url && !this.isValidCloudUrl(url)) {
                    this.showToast('الرابط غير صحيح؛ يجب أن يكون رابط Web App وينتهي بـ /exec', 'error');
                    return;
                }
                if (url !== this.googleScriptUrl) {
                    // A different script has its own history.
                    this.cloudRevision = null;
                    localStorage.removeItem(this.CLOUD_REV_KEY);
                    this.cloudLastSync = '';
                    localStorage.removeItem(this.CLOUD_LAST_KEY);
                }
                this.googleScriptUrl = url;
                this.cloudToken = token;
                this.cloudVerifiedUrl = '';
                localStorage.setItem(this.CLOUD_URL_KEY, url);
                localStorage.setItem(this.CLOUD_TOKEN_KEY, token);
                this.setCloudStatus('idle');
                this.showToast('تم حفظ إعدادات الربط');
            },

            toggleAutoCloudSync(checked) {
                if (checked && !this.cloudReady()) {
                    const box = document.getElementById('autoCloudSyncCheck');
                    if (box) box.checked = false;
                    this.showToast('احفظ الرابط ورمز المزامنة أولًا', 'error');
                    return;
                }
                this.setAutoCloudSync(checked);
                this.showToast(checked ? 'تم تفعيل المزامنة التلقائية' : 'تم إيقاف المزامنة التلقائية', 'info');
                if (checked) this.scheduleCloudSync();
            },

            setAutoCloudSync(enabled) {
                this.autoCloudSync = Boolean(enabled);
                localStorage.setItem(this.CLOUD_AUTO_KEY, String(this.autoCloudSync));
                const box = document.getElementById('autoCloudSyncCheck');
                if (box) box.checked = this.autoCloudSync;
            },

            scheduleCloudSync() {
                if (!this.autoCloudSync || !this.cloudReady()) return;
                if (this.cloudStatus === 'conflict' || this.cloudStatus === 'needs_update') return;
                clearTimeout(this.cloudTimer);
                this.cloudTimer = setTimeout(() => this.syncToGoogleCloud(true), this.cloudDebounceMs);
            },

            /** Refuses to write to the first version of the script, which would overwrite cell A1. */
            async cloudPing() {
                if (this.cloudVerifiedUrl === this.googleScriptUrl) return;
                let info;
                try {
                    const res = await fetch(`${this.googleScriptUrl}?action=ping`);
                    info = await res.json();
                } catch (e) {
                    throw new CloudError('network');
                }
                if (info?.app !== 'moallemkit' || info?.protocol !== CLOUD_PROTOCOL) throw new CloudError('old_script');
                this.cloudVerifiedUrl = this.googleScriptUrl;
            },

            async cloudPost(body) {
                let res;
                try {
                    res = await fetch(this.googleScriptUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                        body: JSON.stringify({ token: this.cloudToken, ...body })
                    });
                } catch (e) {
                    throw new CloudError('network');
                }
                try {
                    return await res.json();
                } catch (e) {
                    throw new CloudError('bad_response');
                }
            },

            async syncToGoogleCloud(silent = false, force = false) {
                if (!this.cloudReady()) {
                    if (!silent) this.showToast('أدخل الرابط ورمز المزامنة ثم اضغط «حفظ الربط»', 'error');
                    return false;
                }
                if (this.cloudInFlight) {
                    this.cloudQueued = true;
                    return false;
                }
                this.cloudInFlight = true;
                this.setCloudStatus('syncing');
                const sentVersion = this.data.lastUpdated;
                try {
                    await this.cloudPing();
                    const payload = JSON.stringify(this.data);
                    const result = await this.cloudPost({ action: 'write', revision: this.cloudRevision, force, payload });

                    if (result?.error === 'conflict') {
                        this.setCloudStatus('conflict');
                        this.openCloudConflictModal(result);
                        return false;
                    }
                    if (!result?.ok) throw new CloudError(result?.error || 'bad_response');
                    if (result.chars !== payload.length) throw new CloudError('verify_failed');

                    this.setCloudRevision(result.revision);
                    this.cloudLastSync = result.updatedAt;
                    localStorage.setItem(this.CLOUD_LAST_KEY, result.updatedAt);
                    if (this.data.lastUpdated === sentVersion) localStorage.removeItem(this.CLOUD_DIRTY_KEY);
                    this.setCloudStatus('idle');
                    if (!silent) {
                        sfx.play('positive');
                        this.showToast('تم رفع البيانات، وأكدت السحابة استلامها كاملة');
                    }
                    return true;
                } catch (e) {
                    const code = e instanceof CloudError ? e.code : 'bad_response';
                    const wasFailing = this.cloudStatus === 'error' && this.cloudLastError === code;
                    this.setCloudStatus(code === 'old_script' ? 'needs_update' : 'error', code);
                    if (!silent || !wasFailing) this.showToast(`لم تكتمل المزامنة: ${this.cloudErrorText(code)}`, 'error');
                    return false;
                } finally {
                    this.cloudInFlight = false;
                    if (this.cloudQueued) {
                        this.cloudQueued = false;
                        this.scheduleCloudSync();
                    }
                }
            },

            setCloudRevision(revision) {
                this.cloudRevision = revision;
                localStorage.setItem(this.CLOUD_REV_KEY, String(revision));
            },

            openCloudConflictModal(info) {
                const when = info?.updatedAt ? this.formatDateTime(info.updatedAt) : 'غير معروف';
                this.openModal('توجد نسخة أحدث في السحابة', `
                    <div class="space-y-4 text-sm text-slate-700">
                        <p>تغيّرت البيانات السحابية من جهاز آخر (آخر تحديث: ${esc(when)}). أوقفنا المزامنة حتى لا تُستبدل تلك التعديلات دون علمك.</p>
                        <div class="grid grid-cols-1 gap-2">
                            <button onclick="app.pullFromGoogleCloud()" class="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold">عرض نسخة السحابة واسترجاعها</button>
                            <button onclick="app.closeModal(); app.syncToGoogleCloud(false, true);" class="p-3 rounded-xl bg-white border border-rose-300 text-rose-700 text-xs font-bold">اعتماد بيانات هذا الجهاز واستبدال السحابة</button>
                            <button onclick="app.closeModal()" class="p-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">لاحقًا</button>
                        </div>
                    </div>
                `);
            },

            async pullFromGoogleCloud() {
                if (!this.cloudReady()) {
                    this.showToast('أدخل الرابط ورمز المزامنة ثم اضغط «حفظ الربط»', 'error');
                    return;
                }
                this.showToast('جاري جلب البيانات من السحابة...', 'info');
                try {
                    await this.cloudPing();
                    const result = await this.cloudPost({ action: 'read' });
                    if (!result?.ok) throw new CloudError(result?.error || 'bad_response');
                    if (!result.payload) {
                        this.showToast('لا توجد بيانات في السحابة بعد', 'error');
                        return;
                    }
                    const incoming = sanitizeData(JSON.parse(result.payload));
                    this.confirmReplaceData(incoming, 'سحابة Google', () => {
                        this.setCloudRevision(result.revision);
                        localStorage.removeItem(this.CLOUD_DIRTY_KEY);
                        this.setCloudStatus('idle');
                    });
                } catch (e) {
                    if (e instanceof CloudError) {
                        this.setCloudStatus(e.code === 'old_script' ? 'needs_update' : 'error', e.code);
                        this.showToast(`تعذر الجلب: ${this.cloudErrorText(e.code)}`, 'error');
                    } else {
                        this.showToast('البيانات في السحابة غير صالحة، ولم يتغير شيء على جهازك', 'error');
                    }
                }
            },

            copyToClipboard(text, successMessage) {
                const temp = document.createElement('textarea');
                temp.value = text;
                document.body.appendChild(temp);
                temp.select();
                const copied = document.execCommand('copy');
                temp.remove();
                this.showToast(copied ? successMessage : 'تعذر النسخ', copied ? 'success' : 'error');
            },

            copyAppsScriptCode() {
                this.copyToClipboard(APPS_SCRIPT_CODE, 'تم نسخ كود السكربت');
            },

            copyTransferCode() {
                this.copyToClipboard(JSON.stringify(this.data), 'تم نسخ رمز البيانات');
            },

            /* ==========================================
               FILES: DEVICE BACKUP, IMPORT, CLEAN APP COPY
               ========================================== */
            async saveFileToDeviceFolder() {
                const jsonStr = JSON.stringify(this.data, null, 2);
                const fileName = `MoallemKit_Data_${getTodayStr(0)}.json`;
                if (!window.showSaveFilePicker) {
                    this.downloadBackupJSON();
                    return;
                }
                try {
                    const handle = await window.showSaveFilePicker({
                        suggestedName: fileName,
                        types: [{ description: 'JSON Database File', accept: { 'application/json': ['.json'] } }]
                    });
                    const writable = await handle.createWritable();
                    await writable.write(jsonStr);
                    await writable.close();
                    sfx.play('positive');
                    this.showToast('تم حفظ ملف البيانات في المجلد المختار');
                } catch (err) {
                    if (err?.name !== 'AbortError') this.downloadBackupJSON();
                }
            },

            downloadBlob(content, type, fileName) {
                const url = URL.createObjectURL(new Blob([content], { type }));
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                link.remove();
                setTimeout(() => URL.revokeObjectURL(url), 10000);
            },

            downloadCleanAppFile() {
                this.downloadBlob(PRISTINE_HTML, 'text/html;charset=utf-8', 'moallim-kit.html');
                this.showToast('تم تحميل نسخة نظيفة. لنقل بياناتك استخدم ملف JSON أو الربط السحابي', 'info');
            },

            downloadBackupJSON() {
                this.downloadBlob(JSON.stringify(this.data, null, 2), 'application/json', `MoallemKit_Backup_${getTodayStr(0)}.json`);
                this.showToast('تم تحميل ملف النسخة الاحتياطية');
            },

            importFromText(text, sourceLabel) {
                try {
                    this.confirmReplaceData(sanitizeData(JSON.parse(text)), sourceLabel);
                } catch (e) {
                    this.showToast('البيانات غير صالحة، ولم يتغير شيء', 'error');
                }
            },

            importBackupJSON(event) {
                const file = event.target.files?.[0];
                event.target.value = '';
                if (!file) return;
                const reader = new FileReader();
                reader.onload = e => this.importFromText(e.target.result, `الملف ${file.name}`);
                reader.onerror = () => this.showToast('تعذر قراءة الملف', 'error');
                reader.readAsText(file);
            },

            importTransferCode() {
                const text = document.getElementById('transferCodeInput')?.value.trim();
                if (text) this.importFromText(text, 'رمز النقل');
            },

            openResetModal() {
                this.openModal('استبدال كل البيانات بالبيانات التجريبية', `
                    <form onsubmit="event.preventDefault(); app.resetToDemoData();" class="space-y-4 text-sm text-slate-700">
                        <p>ستُستبدل كل الحلقات والطلاب والدرجات ببيانات تجريبية، وستُوقف المزامنة التلقائية حتى لا تصل البيانات التجريبية إلى السحابة.</p>
                        <label class="block text-xs font-bold">للتأكيد، اكتب كلمة: استبدال</label>
                        <input type="text" id="resetConfirmInput" required autocomplete="off" class="w-full px-3 py-2 border border-slate-300 rounded-xl">
                        <div class="flex justify-end gap-2">
                            <button type="button" onclick="app.closeModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">تراجع</button>
                            <button type="submit" class="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold">تأكيد الاستبدال</button>
                        </div>
                    </form>
                `);
            },

            resetToDemoData() {
                if (document.getElementById('resetConfirmInput')?.value.trim() !== 'استبدال') {
                    this.showToast('لم تُكتب كلمة التأكيد بشكل صحيح', 'error');
                    return;
                }
                if (!this.saveSnapshot('قبل استبدالها بالبيانات التجريبية')) {
                    this.showToast('تعذر حفظ نسخة احتياطية، صدّر ملف JSON أولًا', 'error');
                    return;
                }
                this.setAutoCloudSync(false);
                this.data = sanitizeData(getInitialDemoData());
                this.saveData(true);
                this.closeModal();
                this.showDashboard();
                this.showToast('تم الاستبدال، ونسختك السابقة في «النسخ التلقائية»');
            },

            /* ==========================================
               ACCESSIBILITY
               ========================================== */
            enhanceA11y() {
                document.querySelectorAll('[onclick]:not(button):not(a):not(input):not(select):not(label):not([role])').forEach(el => {
                    const handler = el.getAttribute('onclick').trim();
                    if (!handler || handler.includes('stopPropagation')) return;
                    el.setAttribute('role', 'button');
                    el.setAttribute('tabindex', '0');
                });
                document.querySelectorAll('button[title]:not([aria-label])').forEach(el => {
                    el.setAttribute('aria-label', el.getAttribute('title'));
                });
                document.querySelectorAll('input[placeholder]:not([aria-label]), textarea[placeholder]:not([aria-label])').forEach(el => {
                    el.setAttribute('aria-label', el.getAttribute('placeholder'));
                });
                document.querySelectorAll('.class-tab-btn').forEach(btn => {
                    if (btn.dataset.tab === ({ quran: 'seating', session: 'sessions' }[this.activeTab] || this.activeTab)) btn.setAttribute('aria-current', 'page');
                    else btn.removeAttribute('aria-current');
                });
            },

            bindGlobalEvents() {
                document.addEventListener('keydown', event => {
                    const modalOpen = !document.getElementById('modalOverlay').classList.contains('hidden');
                    if (event.key === 'Escape' && modalOpen) {
                        this.closeModal();
                    } else if (event.key === 'Tab' && modalOpen) {
                        const items = [...document.querySelectorAll('#modalBox button, #modalBox input, #modalBox select, #modalBox textarea, #modalBox summary')]
                            .filter(el => el.offsetParent !== null);
                        const first = items[0];
                        const last = items[items.length - 1];
                        if (event.shiftKey && (document.activeElement === first || document.activeElement.id === 'modalBox')) {
                            event.preventDefault();
                            last?.focus();
                        } else if (!event.shiftKey && document.activeElement === last) {
                            event.preventDefault();
                            first?.focus();
                        }
                    } else if ((event.key === 'Enter' || event.key === ' ') && event.target.getAttribute?.('role') === 'button') {
                        event.preventDefault();
                        event.target.click();
                    }
                });
                window.addEventListener('resize', () => {
                    const home = !document.getElementById('dashboardView').classList.contains('hidden');
                    if (home && this.doorsPerFloor() !== this.renderedFloorSize) this.renderHomeHero();
                });
                window.addEventListener('online', () => this.scheduleCloudSync());
                // Paper is always printed in the day theme.
                window.addEventListener('beforeprint', () => document.documentElement.classList.remove('dark'));
                window.addEventListener('afterprint', () => document.documentElement.classList.toggle('dark', this.wantsDark()));
                new MutationObserver(() => this.enhanceA11y()).observe(document.body, { childList: true, subtree: true });
            }
        };

        // These actions change saved records, so their message offers a one-step undo.
        ['deleteBehaviorLog', 'deleteQuranLog', 'clearDayAttendance', 'deleteAssessment', 'deleteStudent',
            'archiveStudent', 'purgeArchivedStudent', 'deleteClass', 'markAllAttendance', 'markAllJuzStatus',
            'randomizeSeating', 'resetSeatingOrder'].forEach(name => {
            const action = app[name];
            app[name] = function (...args) {
                this.undoCandidate = JSON.stringify(this.data);
                try {
                    return action.apply(this, args);
                } finally {
                    this.undoCandidate = null;
                }
            };
        });

        // Start Application on Load
        window.addEventListener('DOMContentLoaded', () => {
            app.init();
        });
