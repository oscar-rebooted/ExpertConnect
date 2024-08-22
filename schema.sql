-- Dialectica data table
CREATE TABLE IF NOT EXISTS dialectica_data (
    id TEXT PRIMARY KEY,
    presentation_number INTEGER,
    name TEXT,
    status TEXT,
    client_comment TEXT,
    linkedin_url TEXT,
    quote TEXT,
    project_id TEXT,
    experiences TEXT,
    geo_scope TEXT,
    updated_at DATETIME,
    perspective TEXT,
    status_presented_at DATETIME,
    timezone TEXT,
    relevant_position_company TEXT,
    relevant_position_title TEXT,
    relevant_position_start_date DATE
);

-- Guidepoint data table
CREATE TABLE IF NOT EXISTS guidepoint_data (
    id TEXT PRIMARY KEY,
    prefix TEXT,
    first_name TEXT,
    middle_initial TEXT,
    last_name TEXT,
    suffix TEXT,
    title TEXT,
    organization TEXT,
    bio TEXT,
    response_type TEXT,
    response_date DATETIME,
    last_modified DATETIME,
    enable_identity_verification BOOLEAN,
    country_name TEXT,
    country_iso_code TEXT,
    availability_url TEXT,
    consents_url TEXT,
    compliance_questions_url TEXT,
    compliance_responses_url TEXT,
    compliance_questions_responses_url TEXT,
    screening_questions_url TEXT,
    screening_responses_url TEXT,
    screening_questions_responses_url TEXT
);

-- Aggregated experts table
CREATE TABLE IF NOT EXISTS aggregated_experts (
    id INTEGER PRIMARY KEY,
    network TEXT,
    name TEXT,
    title TEXT,
    organization TEXT,
    country TEXT,
    experience TEXT, -- SQLite does not JSON data type
    last_updated DATETIME
);