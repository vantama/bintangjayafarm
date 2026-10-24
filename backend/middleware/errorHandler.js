const multer = require('multer');

/**
 * Central Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('[Error Logger]:', err.message);

  // Error spesifik dari Multer
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Ukuran file terlalu besar! Maksimal ukuran file adalah 5MB.'
      });
    }
    return res.status(400).json({
      success: false,
      message: `Multer Error: ${err.message}`
    });
  }

  // Error validasi format file custom
  if (err.message && err.message.includes('Format file tidak didukung')) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  // Internal Server Error umum
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Terjadi kesalahan internal pada server.',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorHandler;
