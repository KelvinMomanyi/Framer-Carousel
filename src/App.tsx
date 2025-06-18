import { framer, CanvasNode } from "framer-plugin"
import React, { useState, useEffect, useRef } from "react" // Explicitly import React
import { ChevronLeft, ChevronRight, Circle, Plus, X, Edit3, Upload, Save, Settings, Eye, EyeOff, Download } from 'lucide-react';
import "./App.css"

framer.showUI({
    position: "top right",
    width: 320,
    height: 600,
})

function useSelection() {
    const [selection, setSelection] = useState<CanvasNode[]>([])

    useEffect(() => {
        return framer.subscribeToSelection(setSelection)
    }, [])

    return selection
}

// Helper function to convert gradient class to color
function getGradientColor(gradientClass) {
    const gradientMap = {
        'gradient-purple-pink': 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        'gradient-blue-cyan': 'linear-gradient(135deg, #3b82f6, #06b6d4)',
        'gradient-green-emerald': 'linear-gradient(135deg, #10b981, #059669)',
        'gradient-orange-red': 'linear-gradient(135deg, #f97316, #ef4444)',
        'gradient-pink-rose': 'linear-gradient(135deg, #ec4899, #f43f5e)',
        'gradient-indigo-purple': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    }
    return gradientMap[gradientClass] || 'linear-gradient(135deg, #8b5cf6, #ec4899)'
}

export function App() {
    const [slides, setSlides] = useState([
        { 
            id: 1, 
            title: "Welcome Slide", 
            description: "Your first slide",
            image: null,
            bg: "gradient-purple-pink" 
        },
        { 
            id: 2, 
            title: "Second Slide", 
            description: "Add your content here",
            image: null,
            bg: "gradient-blue-cyan" 
        }
    ]);
    
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [editingSlide, setEditingSlide] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [isUsageGuideOpen, setIsUsageGuideOpen] = useState(true);
    const toggleUsageGuide = () => {
        setIsUsageGuideOpen(!isUsageGuideOpen);
    };
    // Settings
    const [settings, setSettings] = useState({
        autoPlay: true,
        autoPlayInterval: 3000,
        showDots: true,
        showArrows: true,
        height: 400,
        width: 1200,
        borderRadius: 12
    });

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!isPlaying || !settings.autoPlay) return;
        
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, settings.autoPlayInterval);

        return () => clearInterval(interval);
    }, [isPlaying, settings.autoPlayInterval, settings.autoPlay, slides.length]);

    const addSlide = () => {
        const gradients = ['gradient-purple-pink', 'gradient-blue-cyan', 'gradient-green-emerald', 'gradient-orange-red', 'gradient-pink-rose', 'gradient-indigo-purple'];
        const newSlide = {
            id: Date.now(),
            title: `Slide ${slides.length + 1}`,
            description: "New slide description",
            image: null,
            bg: gradients[Math.floor(Math.random() * gradients.length)]
        };
        setSlides([...slides, newSlide]);
    };

    const removeSlide = (id) => {
        if (slides.length <= 1) return;
        const newSlides = slides.filter(slide => slide.id !== id);
        setSlides(newSlides);
        if (currentSlide >= newSlides.length) {
            setCurrentSlide(newSlides.length - 1);
        }
    };

    const updateSlide = (id, updates) => {
        setSlides(slides.map(slide => 
            slide.id === id ? { ...slide, ...updates } : slide
        ));
    };

    const handleImageUpload = async (slideId, event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const image = await framer.uploadImage({
                    image: file,
                    altText: `Slide ${slideId} image`
                });
                updateSlide(slideId, { image });
            } catch (error) {
                console.error('Image upload failed:', error);
                framer.notify('Failed to upload image', { variant: "error" });
            }
        }
    };

    const goToSlide = (index) => setCurrentSlide(index);
    const goToPrevious = () => setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
    const goToNext = () => setCurrentSlide(prev => (prev + 1) % slides.length);

    // Add carousel component to canvas using framer.addComponentInstance
    // const handleAddCarouselToCanvas = async () => {
    //     try {
    //         console.log('Adding carousel component to canvas...');
            
    //         // Validate slides
    //         if (!slides || slides.length === 0) {
    //             throw new Error('No slides available');
    //         }

    //         // Clean slides data
    //         const cleanSlides = slides.map(slide => ({
    //             id: slide.id,
    //             title: slide.title || 'Untitled',
    //             description: slide.description || 'No description',
    //             image: slide.image || null,
    //             bg: slide.bg || 'gradient-purple-pink'
    //         }));

    //         // Insert the Carousel component
    //         const instance = await framer.addComponentInstance({
    //             url: "https://framer.com/m/Carousel-msBD.js",
    //             attributes: {
    //                 width: "800px",
    //                 height: `${settings.height}px`,
    //                 controls: {
    //                     slides: cleanSlides,
    //                     tint: getGradientColor(cleanSlides[0].bg)
    //                 }
    //             }
    //         });

    //         if (instance) {
    //             framer.notify("Carousel component added to canvas!", { variant: "success" });
    //         } else {
    //             throw new Error('Failed to add carousel component');
    //         }
    //     } catch (error) {
    //         console.error('Error adding carousel component to canvas:', error);
    //         framer.notify(`Failed to add carousel: ${error.message}`, { variant: "error" });
    //     }
    // };
    
    const handleAddCarouselToCanvas = async () => {
    try {
        console.log('Adding carousel component to canvas...');
        
        // Validate slides
        if (!slides || slides.length === 0) {
            throw new Error('No slides available');
        }

        // Clean and format slides data to match component expectations
        const formattedSlides = slides.map((slide, index) => ({
            title: slide.title || `Slide ${index + 1}`,
            description: slide.description || 'No description',
            image: slide.image || null,
            backgroundImage: slide.image || `https://images.unsplash.com/photo-${1518709268805 + index}?w=1200&h=600&fit=crop`
        }));

        console.log('Formatted slides:', formattedSlides);

        // Insert the Carousel component with the correct URL and properties
        const instance = await framer.addComponentInstance({
            // Make sure this URL matches your actual published component URL
            url: "https://framer.com/m/Carousel-msBD.js", 
            attributes: {
               width: `${settings.width}px`,
               height: `${settings.height}px`,
                // Pass the data as individual properties that match the component's property controls
                slides: formattedSlides,
                autoPlay: settings.autoPlay,
                autoPlayInterval: settings.autoPlayInterval,
                showDots: settings.showDots,
                showArrows: settings.showArrows,
                carouselHeight: settings.height,
                carouselWidth: settings.width,
                tint: getGradientColor(slides[0]?.bg || 'gradient-purple-pink')
            }
        });

        if (instance) {
            framer.notify("Carousel component added to canvas!", { variant: "success" });
            console.log('Carousel component added successfully:', instance);
        } else {
            throw new Error('Failed to add carousel component - no instance returned');
        }
    } catch (error) {
        console.error('Error adding carousel component to canvas:', error);
        framer.notify(`Failed to add carousel: ${error.message}`, { variant: "error" });
    }
};
    const EditModal = ({ slide, onClose, onSave }) => {
        const [title, setTitle] = useState(slide.title);
        const [description, setDescription] = useState(slide.description);
        const [bgColor, setBgColor] = useState(slide.bg);

        const gradients = [
            'gradient-purple-pink',
            'gradient-blue-cyan',
            'gradient-green-emerald',
            'gradient-orange-red',
            'gradient-pink-rose',
            'gradient-indigo-purple'
        ];

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Edit Slide</h3>
                        <button onClick={onClose} className="close-btn">
                            <X className="icon-sm" />
                        </button>
                    </div>
                    
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-textarea"
                                rows="3"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">Background</label>
                            <div className="gradient-grid">
                                {gradients.map((gradient, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setBgColor(gradient)}
                                        className={`gradient-option ${gradient} ${bgColor === gradient ? 'selected' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(slide.id, e)}
                                className="file-input"
                            />
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button onClick={onClose} className="btn-secondary">
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                onSave({ title, description, bg: bgColor });
                                onClose();
                            }}
                            className="btn-primary"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel-container">
            {/* Settings Panel */}
            {showSettings && (
                <div className="settings-panel">
                    <h3 className="settings-title">Carousel Settings</h3>
                    <div className="settings-grid">
                        <div>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={settings.autoPlay}
                                    onChange={(e) => setSettings({...settings, autoPlay: e.target.checked})}
                                />
                                <span className="checkbox-text">Auto Play</span>
                            </label>
                        </div>
                        <div>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={settings.showDots}
                                    onChange={(e) => setSettings({...settings, showDots: e.target.checked})}
                                />
                                <span className="checkbox-text">Show Dots</span>
                            </label>
                        </div>
                        <div>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={settings.showArrows}
                                    onChange={(e) => setSettings({...settings, showArrows: e.target.checked})}
                                />
                                <span className="checkbox-text">Show Arrows</span>
                            </label>
                        </div>
                        <div>
                            <label className="form-label">Height (px)</label>
                            <input
                                type="number"
                                value={settings.height}
                                onChange={(e) => setSettings({...settings, height: parseInt(e.target.value)})}
                                className="settings-input"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Carousel */}
            {/* <div 
                className="carousel-wrapper"
                style={{ height: `${settings.height}px`, borderRadius: `${settings.borderRadius}px` }}
            > */}
                {/* <div 
                    className="slides-container"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`slide ${slide.bg}`}
                            style={{
                                backgroundImage: slide.image ? `url(${slide.image})` : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            {slide.image && <div className="slide-overlay" />}
                            <div className="slide-content">
                                <div className="slide-title">{slide.title}</div>
                                <div className="slide-description">{slide.description}</div>
                            </div>
                            
                            {editMode && (
                                <div className="slide-controls">
                                    <button
                                        onClick={() => setEditingSlide(slide)}
                                        className="control-btn edit-btn"
                                    >
                                        <Edit3 className="icon-sm" />
                                    </button>
                                    <button
                                        onClick={() => removeSlide(slide.id)}
                                        className="control-btn delete-btn"
                                    >
                                        <X className="icon-sm" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div> */}

                {/* Navigation Arrows */}
                {/* {settings.showArrows && (
                    <>
                        <button onClick={goToPrevious} className="nav-arrow nav-arrow-left">
                            <ChevronLeft className="icon-md" />
                        </button>
                        <button onClick={goToNext} className="nav-arrow nav-arrow-right">
                            <ChevronRight className="icon-md" />
                        </button>
                    </>
                )} */}

                {/* Slide Indicators */}
                {/* {settings.showDots && (
                    <div className="indicators">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className="indicator-btn"
                            >
                                <Circle className={`indicator ${index === currentSlide ? 'active' : ''}`} />
                            </button>
                        ))}
                    </div>
                )} */}
            {/* </div> */}

            {/* Control Panel */}
            {/* <div className="control-panel">
                <div className="slide-counter">
                    <span className="counter-text">
                        Slide {currentSlide + 1} of {slides.length}
                    </span>
                </div>
                
                <div className="control-buttons">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className={`control-btn ${showSettings ? 'active' : ''}`}
                    >
                        <Settings className="icon-sm" />
                    </button>
                    <button
                        onClick={() => setEditMode(!editMode)}
                        className={`control-btn ${editMode ? 'active' : ''}`}
                    >
                        {editMode ? <Eye className="icon-sm" /> : <EyeOff className="icon-sm" />}
                    </button>
                    <button onClick={addSlide} className="control-btn primary">
                        <Plus className="icon-sm" />
                    </button>
                    <button onClick={goToPrevious} className="control-btn">
                        <ChevronLeft className="icon-sm" />
                    </button>
                    <button onClick={goToNext} className="control-btn">
                        <ChevronRight className="icon-sm" />
                    </button>
                </div>
            </div> */}

            {/* Canvas Export Controls */}
            <div className="export-panel">
                <h4 className="export-title">Add to Canvas</h4>
                <div className="export-buttons">
                    <button
                        onClick={handleAddCarouselToCanvas}
                        className="export-btn primary"
                    >
                        <Download className="icon-sm" />
                        Add Full Carousel
                    </button>
                </div>
            </div>

            {/* Edit Mode Instructions */}
            {editMode && (
                <div className="instructions-panel">
                    <h4 className="instructions-title">Edit Mode Active</h4>
                    <ul className="instructions-list">
                        <li>• Click the edit icon on any slide to modify its content</li>
                        <li>• Click the X icon to remove a slide</li>
                        <li>• Use the + button to add new slides</li>
                        <li>• Toggle settings to customize carousel behavior</li>
                    </ul>
                </div>
            )}

            {/* Slide Thumbnails */}
            {/* <div className="thumbnails">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        onClick={() => goToSlide(index)}
                        className={`thumbnail ${slide.bg} ${index === currentSlide ? 'active' : ''}`}
                        style={{
                            backgroundImage: slide.image ? `url(${slide.image})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {!slide.image && (index + 1)}
                    </div>
                ))}
            </div> */}

            {/* Edit Modal */}
            {editingSlide && (
                <EditModal
                    slide={editingSlide}
                    onClose={() => setEditingSlide(null)}
                    onSave={(updates) => updateSlide(editingSlide.id, updates)}
                />
            )}

            {/* Usage Guide */}
            <div className="usage-guide">
            <h3 
                className={`guide-title ${!isUsageGuideOpen ? 'collapsed' : ''}`}
                onClick={toggleUsageGuide}
            >
                How to Use This Customizable Carousel:
            </h3>
            <div className={`guide-content ${!isUsageGuideOpen ? 'collapsed' : ''}`}>
                <p>• <strong>Add Slides:</strong> Use the "Slides Data" array control in Framer's property panel to add new slides</p>
                <p>• <strong>Configure Content:</strong> For each slide, set the title, description, and background image</p>
                <p>• <strong>Upload Images:</strong> Use Framer's image control to upload background images for each slide</p>
                <p>• <strong>Auto-play Settings:</strong> Toggle auto-play and adjust interval timing and direction</p>
                <p>• <strong>Visual Controls:</strong> Show/hide content overlays and navigation arrows as needed</p>
                <p>• <strong>Responsive Design:</strong> Component automatically adapts to different screen sizes</p>
            </div>
        </div>
        </div>
    );
}