import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PillButton } from './PillButton';
import { useLenis } from '../providers/SmoothScrollProvider';

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
  const [isMobile, setIsMobile] = useState(false);
  const lenis = useLenis();

  // Detect mobile viewport
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Scroll lock & Lenis pause
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [isOpen, lenis]);

  // Reset local state when opened with new initial selection
  useEffect(() => {
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

  const handleSelectAll = () => {
    if (selected.size === filteredCourses.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredCourses));
    }
  };

  if (!isOpen) return null;

  const allSelected = filteredCourses.length > 0 && filteredCourses.every(c => selected.has(c));

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-6 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/30 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <motion.div
            /* Mobile: slide up from bottom. Desktop: scale in from center */
            initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.96, y: 16 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            data-lenis-prevent
            className={`
              relative w-full glass-panel shadow-glass flex flex-col overflow-hidden border border-white/40 z-10
              ${isMobile
                ? 'rounded-t-3xl max-h-[92dvh]'
                : 'sm:max-w-2xl sm:rounded-2xl sm:max-h-[85vh]'
              }
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile drag handle */}
            {isMobile && (
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-10 h-1 rounded-full bg-on-surface/20" />
              </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-on-surface/10 shrink-0">
              <div>
                <h2 className="text-headline-sm sm:text-headline-md text-primary font-bold">Select Courses</h2>
                <p className="text-on-surface/60 text-xs sm:text-sm mt-0.5 font-headline font-medium">{fieldLabel}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-on-surface/5 transition-colors text-on-surface/60 hover:text-primary"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {/* Search Box */}
            <div className="px-5 sm:px-6 py-3 border-b border-on-surface/10 bg-on-surface/5 shrink-0">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface/40 text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/60 backdrop-blur-md border border-on-surface/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-on-surface placeholder-on-surface/40 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/30 transition-all shadow-sm"
                />
              </div>

              {/* Select All toggle */}
              {filteredCourses.length > 0 && (
                <button
                  onClick={handleSelectAll}
                  className="mt-2 text-[11px] font-headline font-bold text-secondary hover:text-primary transition-colors"
                >
                  {allSelected ? 'Deselect All' : `Select All (${filteredCourses.length})`}
                </button>
              )}
            </div>

            {/* Courses List */}
            <div
              className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-6 py-4 overscroll-contain"
              data-lenis-prevent
            >
              {filteredCourses.length === 0 ? (
                <div className="text-center py-12 text-on-surface/40 text-sm">
                  No courses found for "{searchQuery}"
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {filteredCourses.map(course => {
                    const isSelected = selected.has(course);
                    return (
                      <motion.button
                        key={course}
                        onClick={() => toggleCourse(course)}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          flex items-center gap-3 p-3 text-left rounded-xl border transition-all duration-150 group
                          ${isSelected
                            ? 'bg-secondary/10 border-secondary/30 shadow-[0_0_12px_rgba(79,70,229,0.08)]'
                            : 'bg-white/50 border-transparent hover:bg-white/80 hover:border-on-surface/10 shadow-sm'
                          }
                        `}
                      >
                        <div className={`
                          w-[18px] h-[18px] rounded-md flex items-center justify-center shrink-0 border-2 transition-all
                          ${isSelected
                            ? 'bg-secondary border-secondary text-white'
                            : 'border-on-surface/25 group-hover:border-secondary/60'
                          }
                        `}>
                          {isSelected && (
                            <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                          )}
                        </div>
                        <span className={`text-sm leading-snug ${isSelected ? 'text-secondary font-bold' : 'text-on-surface font-medium'}`}>
                          {course}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-t border-on-surface/10 bg-on-surface/5 shrink-0">
              <span className="text-xs text-on-surface/50 font-headline font-semibold">
                {selected.size > 0 ? `${selected.size} selected` : 'None selected'}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-full text-on-surface hover:text-primary transition-colors text-sm font-bold"
                >
                  Cancel
                </button>
                <PillButton
                  variant="primary"
                  className="!py-2 !px-6 !text-sm"
                  onClick={handleApply}
                >
                  Apply {selected.size > 0 && `(${selected.size})`}
                </PillButton>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default CourseSelectionModal;
