import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PillButton } from './PillButton';

interface CourseSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  fieldLabel: string;
  courses: string[];
  initialSelectedCourses: string[];
  onApply: (selectedCourses: string[]) => void;
}

export const CourseSelectionModal: React.FC<CourseSelectionModalProps> = ({
  isOpen,
  onClose,
  fieldLabel,
  courses,
  initialSelectedCourses,
  onApply
}) => {
  const [selected, setSelected] = useState<Set<string>>(new Set(initialSelectedCourses));
  const [searchQuery, setSearchQuery] = useState('');

  // Reset local state when opened with new initial selection
  React.useEffect(() => {
    if (isOpen) {
      setSelected(new Set(initialSelectedCourses));
      setSearchQuery('');
    }
  }, [isOpen, initialSelectedCourses]);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => 
      course.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [courses, searchQuery]);

  const toggleCourse = (course: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(course)) {
      newSelected.delete(course);
    } else {
      newSelected.add(course);
    }
    setSelected(newSelected);
  };

  const handleApply = () => {
    onApply(Array.from(selected));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl glass-panel rounded-2xl shadow-glass flex flex-col max-h-[85vh] overflow-hidden border border-white/40"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-on-surface/10">
              <div>
                <h2 className="text-display-sm text-primary font-bold">Select Courses</h2>
                <p className="text-on-surface/70 text-sm mt-1">{fieldLabel}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-on-surface/5 transition-colors text-on-surface/70 hover:text-primary"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Search Box */}
            <div className="px-6 py-4 border-b border-on-surface/10 bg-on-surface/5">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/50 text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/50 backdrop-blur-md border border-on-surface/10 rounded-xl py-3 pl-12 pr-4 text-on-surface placeholder-on-surface/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Courses List */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar overscroll-contain" data-lenis-prevent="true">
              {filteredCourses.length === 0 ? (
                <div className="text-center py-10 text-on-surface/50">
                  No courses found matching "{searchQuery}"
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredCourses.map(course => {
                    const isSelected = selected.has(course);
                    return (
                      <button
                        key={course}
                        onClick={() => toggleCourse(course)}
                        className={`
                          flex items-center gap-3 p-3 text-left rounded-xl border transition-all duration-200 group
                          ${isSelected 
                            ? 'bg-primary/10 border-primary/30 shadow-[0_0_15px_rgba(30,136,229,0.05)]' 
                            : 'bg-white/40 border-transparent hover:bg-white/80 hover:border-on-surface/10 shadow-sm'
                          }
                        `}
                      >
                        <div className={`
                          w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors
                          ${isSelected ? 'bg-primary border-primary text-white' : 'border-on-surface/30 group-hover:border-primary/50'}
                        `}>
                          {isSelected && (
                            <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                          )}
                        </div>
                        <span className={`text-sm ${isSelected ? 'text-primary font-bold' : 'text-on-surface font-medium'}`}>
                          {course}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-4 p-6 border-t border-on-surface/10 bg-on-surface/5">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full text-on-surface hover:text-primary transition-colors text-sm font-bold"
              >
                Cancel
              </button>
              <PillButton
                variant="primary"
                className="!py-2.5 !px-8 !text-sm"
                onClick={handleApply}
              >
                Apply Selection {selected.size > 0 && `(${selected.size})`}
              </PillButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
