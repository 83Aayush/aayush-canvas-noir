-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);

-- Create storage policies for file access
CREATE POLICY "Anyone can view resumes" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'resumes');

CREATE POLICY "Admin can upload resumes" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Admin can update resumes" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'resumes');

CREATE POLICY "Admin can delete resumes" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'resumes');

CREATE POLICY "Anyone can view project images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'project-images');

CREATE POLICY "Admin can upload project images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Admin can update project images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'project-images');

CREATE POLICY "Admin can delete project images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'project-images');

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  overview TEXT,
  technologies TEXT[],
  project_link TEXT,
  github_link TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_settings table for storing resume and other admin data
CREATE TABLE public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on projects table
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Enable RLS on admin_settings table  
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for projects (public read access)
CREATE POLICY "Anyone can view projects" 
ON public.projects 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage projects" 
ON public.projects 
FOR ALL 
USING (true);

-- Create policies for admin_settings (public read access for resume)
CREATE POLICY "Anyone can view admin settings" 
ON public.admin_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage settings" 
ON public.admin_settings 
FOR ALL 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_settings_updated_at
  BEFORE UPDATE ON public.admin_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();