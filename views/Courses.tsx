
import React from 'react';

interface CoursesProps {
  onSelectCourse: () => void;
}

const COURSES = [
  { id: 1, title: 'English for Business', level: 'B1', progress: 75, students: '1.2k', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400' },
  { id: 2, title: 'IELTS Preparation', level: 'B2', progress: 30, students: '850', image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80&w=400' },
  { id: 3, title: 'Daily Conversations', level: 'A2', progress: 10, students: '2.4k', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400' },
  { id: 4, title: 'Public Speaking', level: 'C1', progress: 0, students: '400', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=400' },
];

const Courses: React.FC<CoursesProps> = ({ onSelectCourse }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold text-text-main">Meus Cursos</h2>
        <p className="text-text-muted font-medium">Continue de onde parou para manter sua ofensiva.</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
        {['Todos', 'Negócios', 'Viagens', 'Gramática', 'Vocabulário'].map((cat, i) => (
          <button key={i} className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${i === 0 ? 'bg-primary text-white shadow-glow' : 'bg-white text-text-muted border border-slate-100 hover:border-primary/30'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map((course) => (
          <div key={course.id} onClick={onSelectCourse} className="bg-white rounded-3xl overflow-hidden shadow-soft border border-slate-50 group cursor-pointer hover:-translate-y-1 transition-all">
            <div className="h-44 relative overflow-hidden">
              <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={course.title} />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-xs font-black text-primary uppercase">
                {course.level}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-text-main mb-2">{course.title}</h3>
              <div className="flex items-center gap-4 text-xs text-text-muted font-bold mb-6">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">groups</span> {course.students}</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">play_circle</span> 24 lições</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-black uppercase tracking-tighter">
                  <span className="text-text-muted">Progresso</span>
                  <span className="text-primary">{course.progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
