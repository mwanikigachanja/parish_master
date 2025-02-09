-- =====================================================
-- SQL Schema for Catholic Parish Admin Prototype (JS + PHP Version)
-- =====================================================

-- Table: users
-- Purpose: Store application users (for login, roles, etc.)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- store hashed passwords
    email VARCHAR(254) NOT NULL UNIQUE,
    role ENUM('admin','user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table: parishioners
-- Purpose: Store parishioner information.
CREATE TABLE parishioners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    baptism_date DATE,
    marriage_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table: sacraments
-- Purpose: Record sacramental events (e.g., Baptism, Marriage, Confirmation, First Communion).
CREATE TABLE sacraments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parishioner_id INT NOT NULL,
    sacrament_type ENUM('baptism','marriage','confirmation','first_communion') NOT NULL,
    date DATE NOT NULL,
    certificate VARCHAR(255),  -- File path or URL for the generated certificate document
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sacrament_parishioner
        FOREIGN KEY (parishioner_id)
        REFERENCES parishioners(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table: ministers
-- Purpose: Define ministers (e.g., priests and catechists) separately.
CREATE TABLE ministers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    role ENUM('priest','catechist') NOT NULL,
    designation VARCHAR(100),  -- Optional: e.g., "Senior Priest" or "Lead Catechist"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_minister_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table: mass_events
-- Purpose: Schedule Masses or liturgical events.
CREATE TABLE mass_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_date TIMESTAMP NOT NULL,
    location VARCHAR(200) NOT NULL,
    minister_id INT,  -- Reference to the minister (priest or catechist) assigned to the event.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_mass_event_minister
        FOREIGN KEY (minister_id)
        REFERENCES ministers(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

-- Table: donations
-- Purpose: Track donations and offerings (e.g., tithe, special collections, zaka, etc.).
CREATE TABLE donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    donor_id INT NOT NULL,  -- Reference to the donor from the users table.
    donation_type ENUM('tithe','special','zaka','fungu','sadaka') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mpesa_reference VARCHAR(100),
    CONSTRAINT fk_donation_donor
        FOREIGN KEY (donor_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table: volunteers
-- Purpose: Manage volunteer sign-ups and track service hours and contributions.
CREATE TABLE volunteers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,       -- Reference to the volunteer from the users table.
    event_id INT NOT NULL,      -- Reference to the mass event.
    hours_served DECIMAL(5,2) DEFAULT 0.0,
    contribution_type VARCHAR(50),  -- e.g., 'zaka', 'fungu la kumi', etc.
    date_signed_up TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_volunteer_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_volunteer_event
        FOREIGN KEY (event_id)
        REFERENCES mass_events(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table: attendance
-- Purpose: Record Mass attendance for events.
CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,  -- Reference to the mass event.
    attendees_count INT NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_attendance_event
        FOREIGN KEY (event_id)
        REFERENCES mass_events(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table: bulletins
-- Purpose: Post bulletins and announcements for parish activities.
CREATE TABLE bulletins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id INT,  -- Reference to the user who posted (from the users table).
    attachments VARCHAR(255),  -- File path(s) or URL(s) for attachments.
    CONSTRAINT fk_bulletin_author
        FOREIGN KEY (author_id)
        REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

-- =====================================================
-- End of SQL Schema for Catholic Parish Admin Prototype
-- =====================================================
