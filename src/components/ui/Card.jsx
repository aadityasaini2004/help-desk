import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Card = ({ children, className, hover = false, ...props }) => {
    return (
        <motion.div
            whileHover={hover ? { y: -5 } : {}}
            className={cn(
                'bg-surface border border-gray-800 rounded-xl p-6 shadow-xl backdrop-blur-sm',
                hover && 'hover:border-gray-700 hover:shadow-2xl transition-all duration-300',
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
