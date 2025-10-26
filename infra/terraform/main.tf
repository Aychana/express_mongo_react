provider "aws" {
  region = "us-west-2"   // Fournisseur AWS, région Oregon (us-west-2)
}

resource "aws_security_group" "fil_rouge_sg" {
  name        = "fil-rouge-sg"
  description = "Allow SSH and HTTP"

  ingress {   // Règle entrante : autorise SSH (port 22)
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]   // Ouvert à tout le monde 
  }

  ingress {   // Règle entrante : autorise HTTP (port 80)
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {    // Règle sortante : autorise tout le trafic sortant
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "fil_rouge_ec2" {
  ami           = "ami-0e1d35993cb249cee" // AMI Amazon Linux 2 (us-west-2)
  instance_type = "t2.micro"              // Type d’instance autorisé dans ton sandbox
  vpc_security_group_ids = [aws_security_group.fil_rouge_sg.id] // Associe le SG

  tags = {
    Name = "fil-rouge-ec2"   // Nom de l’instance dans la console AWS
  }
}

output "ec2_public_ip" {
  value = aws_instance.fil_rouge_ec2.public_ip
  // Affiche l’IP publique de l’instance après création
}